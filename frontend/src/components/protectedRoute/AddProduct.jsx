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

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      color: ''
    }
  });

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
      const imageUrl = await uploadImage();
      if (!imageUrl && !file) {
        toast.error('Please select an image');
        return;
      }

      const productData = {
        ...data,
        image: imageUrl,
        price: Number(data.price),
        discount: Number(data.discount),
        category: data.category.split(',').map(item => item.trim()),
        size: data.size.split(',').map(item => item.trim()),
        color: data.color.split(',').map(item => item.trim())
      };

      await dispatch(createProduct(productData)).unwrap();
      reset();
      setFile(null);
      setPreviewImage(null);
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
                placeholder="0.00"
                {...register('price')}
                error={errors.price?.message}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categories (comma-separated)</Label>
              <Input
                id="category"
                placeholder="shirt, pants, shoes"
                {...register('category')}
                error={errors.category?.message}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Sizes (comma-separated)</Label>
              <Input
                id="size"
                placeholder="S, M, L, XL"
                {...register('size')}
                error={errors.size?.message}
              />
              {errors.size && (
                <p className="text-sm text-red-500">{errors.size.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Colors (comma-separated)</Label>
              <Input
                id="color"
                placeholder="red, blue, green"
                {...register('color')}
                error={errors.color?.message}
              />
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="0"
                min="0"
                max="100"
                {...register('discount')}
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
              placeholder="Product description"
              className="h-32"
              {...register('description')}
              error={errors.description?.message}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
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
