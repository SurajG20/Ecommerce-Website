import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { productSchema } from "../../schemas/product";
import { updateProduct, fetchSingleProduct } from "../../redux/features/productSlice";
import { cn } from "../../utils/cn";

const VALID_CATEGORIES = ['clothes', 'women', 'men', 'shoes', 'electronics', 'others'];
const COMMON_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11'];
const COMMON_COLORS = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Gray', 'Navy', 'Pink'];

const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="text-gray-700 font-semibold block mb-2">{label}</label>
    <input
      className={cn(
        "w-full p-2 border rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        "transition-all duration-200",
        error ? "border-red-500 ring-red-500" : "border-gray-300"
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const TextArea = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="text-gray-700 font-semibold block mb-2">{label}</label>
    <textarea
      className={cn(
        "w-full p-2 border rounded-md min-h-[100px]",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        "transition-all duration-200",
        error ? "border-red-500 ring-red-500" : "border-gray-300"
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const { selectedProduct, isLoading } = useSelector((state) => state.products);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
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
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '0',
      discount: '0',
      inStock: true,
      category: [],
      size: [],
      color: []
    }
  });

  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (selectedProduct) {
      const defaultValues = {
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price.toString(),
        discount: (selectedProduct.discount || 0).toString(),
        inStock: selectedProduct.inStock ?? true,
        category: selectedProduct.category || [],
        size: selectedProduct.size || [],
        color: selectedProduct.color || []
      };
      reset(defaultValues);

      setPreviewImage(selectedProduct.image);
      setSelectedCategories(selectedProduct.category || []);
      setSelectedSizes(selectedProduct.size || []);
      setSelectedColors(selectedProduct.color || []);
    }
  }, [selectedProduct, reset]);

  useEffect(() => {
    setValue('category', selectedCategories);
    setValue('size', selectedSizes);
    setValue('color', selectedColors);
  }, [selectedCategories, selectedSizes, selectedColors, setValue]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    setValue('category', updatedCategories);
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updatedSizes);
    setValue('size', updatedSizes);
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    setValue('color', updatedColors);
  };

  const handleCustomSizeAdd = (e) => {
    e.preventDefault();
    if (customSize && !selectedSizes.includes(customSize)) {
      const updatedSizes = [...selectedSizes, customSize];
      setSelectedSizes(updatedSizes);
      setValue('size', updatedSizes);
      setCustomSize('');
    }
  };

  const handleCustomColorAdd = (e) => {
    e.preventDefault();
    if (customColor && !selectedColors.includes(customColor)) {
      const updatedColors = [...selectedColors, customColor];
      setSelectedColors(updatedColors);
      setValue('color', updatedColors);
      setCustomColor('');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(previewUrl);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (uploadError) => {
          toast.error("Upload failed: " + uploadError.message);
          setIsUploading(false);
          setUploadProgress(0);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedImageUrl(downloadURL);
            setPreviewImage(downloadURL);
            toast.success("Image uploaded successfully!");
          } catch (error) {
            toast.error("Failed to get download URL: " + error.message);
          } finally {
            setIsUploading(false);
            setUploadProgress(0);
          }
        }
      );
    } catch (error) {
      toast.error("Upload failed: " + error.message);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
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

      const updatedProduct = {
        ...data,
        image: uploadedImageUrl || selectedProduct.image,
        category: selectedCategories,
        size: selectedSizes,
        color: selectedColors,
      };

      await dispatch(updateProduct({ id: productId, data: updatedProduct })).unwrap();

    } catch (error) {
      console.error('Update error:', error);
      toast.error(error || "Failed to update product");
    }
  }, (errors) => {
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(field => {
        toast.error(`${field}: ${errors[field].message}`);
      });
    }
  });

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  if (isLoading || !selectedProduct) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Update Product</h1>
          <Link to="/admin">
            <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              All Products
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            {previewImage ? (
              <img
                className="w-full h-full object-cover"
                alt="Product preview"
                src={previewImage}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image selected
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <label className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                Select Image
              </label>
              {file && (
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={cn(
                    "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center",
                    isUploading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Uploading... {uploadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Title"
                type="text"
                error={errors.title?.message}
                {...register("title")}
              />
              <TextArea
                label="Description"
                error={errors.description?.message}
                {...register("description")}
              />

              <div className="space-y-2">
                <label className="text-gray-700 font-semibold block">Categories</label>
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
                  <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-semibold block">Sizes</label>
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
                  <input
                    type="text"
                    placeholder="Add custom size"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleCustomSizeAdd}
                    disabled={!customSize}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Add Size
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-semibold block">Colors</label>
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
                  <input
                    type="text"
                    placeholder="Add custom color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleCustomColorAdd}
                    disabled={!customColor}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Add Color
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  min="0"
                  error={errors.price?.message}
                  {...register("price")}
                />
                <Input
                  label="Discount (%)"
                  type="number"
                  min="0"
                  max="100"
                  error={errors.discount?.message}
                  {...register("discount")}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  className={cn(
                    "w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary",
                    errors.inStock && "border-red-500"
                  )}
                  {...register("inStock")}
                />
                <label htmlFor="inStock" className="text-gray-700 font-semibold">
                  In Stock
                </label>
                {errors.inStock && (
                  <p className="text-sm text-red-500">{errors.inStock.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isLoading || isUploading}
                className={cn(
                  "px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90",
                  (isLoading || isUploading) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
