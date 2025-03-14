import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Upload, ImagePlus, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../schemas/product';
import { createProduct } from '../../redux/features/productSlice';
import app from '../../firebase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { cn } from '../../utils/cn';
import DefaultImage from '../../assets/default-image.jpg';
import { toast } from 'sonner';

const VALID_CATEGORIES = ['clothes', 'women', 'men', 'shoes', 'electronics', 'others'];
const COMMON_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11'];
const COMMON_COLORS = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Gray', 'Navy', 'Pink'];

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [customSize, setCustomSize] = useState('');
  const [customColor, setCustomColor] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discount: 0,
      category: '',
      size: '',
      color: '',
      inStock: true
    }
  });

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    setValue('category', updatedCategories.join(', '));
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(updatedSizes);
    setValue('size', updatedSizes.join(', '));
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];

    setSelectedColors(updatedColors);
    setValue('color', updatedColors.join(', '));
  };

  const handleCustomSizeAdd = (e) => {
    e.preventDefault();
    if (customSize && !selectedSizes.includes(customSize)) {
      const updatedSizes = [...selectedSizes, customSize];
      setSelectedSizes(updatedSizes);
      setValue('size', updatedSizes.join(', '));
      setCustomSize('');
    }
  };

  const handleCustomColorAdd = (e) => {
    e.preventDefault();
    if (customColor && !selectedColors.includes(customColor)) {
      const updatedColors = [...selectedColors, customColor];
      setSelectedColors(updatedColors);
      setValue('color', updatedColors.join(', '));
      setCustomColor('');
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (!file) return null;

    setIsUploading(true);
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(Math.round(progress));
          },
          (error) => {
            toast.error('Image upload failed');
            setIsUploading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setIsUploading(false);
              resolve(downloadURL);
            } catch (error) {
              toast.error('Failed to get download URL');
              setIsUploading(false);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      if (selectedCategories.length === 0) {
        toast.error('Please select at least one category');
        return;
      }

      if (selectedSizes.length === 0) {
        toast.error('Please select at least one size');
        return;
      }

      if (selectedColors.length === 0) {
        toast.error('Please select at least one color');
        return;
      }

      const imageUrl = await uploadImage();
      if (!imageUrl && !file) {
        toast.error('Please select an image');
        return;
      }

      const productData = {
        ...data,
        image: imageUrl,
        price: parseFloat(data.price),
        discount: parseInt(data.discount) || 0,
        category: selectedCategories,
        size: selectedSizes,
        color: selectedColors,
        inStock: Boolean(data.inStock)
      };

      await dispatch(createProduct(productData)).unwrap();
      toast.success('Product created successfully!');
      reset();
      setFile(null);
      setPreviewImage(null);
      setSelectedCategories([]);
      setSelectedSizes([]);
      setSelectedColors([]);
    } catch (error) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Image Preview */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
            <img
              src={previewImage || DefaultImage}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center">
            <Label
              htmlFor="image-upload"
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                "px-4 py-2 rounded-md border border-gray-300",
                "hover:bg-gray-50 transition-colors"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Uploading... {uploadProgress}%</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-5 w-5" />
                  <span>Choose Image</span>
                </>
              )}
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Product title"
                {...register('title')}
                error={errors.title?.message}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {VALID_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium capitalize",
                      "border transition-colors",
                      selectedCategories.includes(category)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Sizes</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      "border transition-colors",
                      selectedSizes.includes(size)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom size"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleCustomSizeAdd}
                  disabled={!customSize}
                  variant="outline"
                >
                  Add Size
                </Button>
              </div>
              {errors.size && (
                <p className="text-sm text-red-500">{errors.size.message}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Colors</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      "border transition-colors",
                      selectedColors.includes(color)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleCustomColorAdd}
                  disabled={!customColor}
                  variant="outline"
                >
                  Add Color
                </Button>
              </div>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                {...register('discount', { valueAsNumber: true })}
                error={errors.discount?.message}
              />
              {errors.discount && (
                <p className="text-sm text-red-500">{errors.discount.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Lightweight running shoes with breathable mesh and cushioned sole"
              className="h-32"
              {...register('description')}
              error={errors.description?.message}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="inStock"
              className="form-checkbox h-5 w-5 text-primary rounded border-gray-300"
              {...register('inStock')}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || isUploading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
