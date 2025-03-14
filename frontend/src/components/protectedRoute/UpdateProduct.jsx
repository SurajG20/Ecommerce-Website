import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { updateProduct, fetchProducts } from "../../redux/features/productSlice";
import Footer from "../Footer";
import Announcements from "../Announcement";
import Navbar from "../Navbar";
import { cn } from "../../utils/cn";

const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="text-gray-700 font-semibold block mb-2">{label}</label>
    <input
      className={cn(
        "w-full p-2 border rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        "transition-all duration-200",
        error && "border-red-500"
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const { products, isLoading } = useSelector((state) => state.products);
  const product = products?.find((p) => p._id === productId);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount,
        category: product.category?.join(", "),
        size: product.size?.join(", "),
        color: product.color?.join(", "),
      });
      setPreviewImage(product.image);
    }
  }, [product, reset]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setIsUploading(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.info(`Upload is ${Math.round(progress)}% done`);
        },
        (uploadError) => {
          toast.error("Upload failed: " + uploadError.message);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedImageUrl(downloadURL);
          toast.success("Image uploaded successfully!");
          setIsUploading(false);
        }
      );
    } catch (error) {
      toast.error("Upload failed: " + error.message);
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedProduct = {
        ...data,
        image: uploadedImageUrl || product.image,
        price: Number(data.price),
        discount: Number(data.discount),
        category: data.category.split(",").map((cat) => cat.trim()),
        size: data.size.split(",").map((s) => s.trim()),
        color: data.color.split(",").map((c) => c.trim()),
      };

      await dispatch(updateProduct({ id: productId, data: updatedProduct })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  };

  if (isLoading || !product) {
    return (
      <>
        <Announcements />
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Announcements />
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Update Product</h1>
            <Link to="/admin">
              <button className="btn btn-outline">All Products</button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <img
                className="w-full h-full object-cover"
                alt="Product preview"
                src={previewImage}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <label className="btn btn-outline">
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
                      "btn btn-primary",
                      isUploading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Title"
                  type="text"
                  error={errors.title?.message}
                  {...register("title")}
                />
                <Input
                  label="Description"
                  type="text"
                  error={errors.description?.message}
                  {...register("description")}
                />
                <Input
                  label="Categories (comma-separated)"
                  type="text"
                  error={errors.category?.message}
                  {...register("category")}
                />
                <Input
                  label="Sizes (comma-separated)"
                  type="text"
                  error={errors.size?.message}
                  {...register("size")}
                />
                <Input
                  label="Colors (comma-separated)"
                  type="text"
                  error={errors.color?.message}
                  {...register("color")}
                />
                <Input
                  label="Price"
                  type="number"
                  error={errors.price?.message}
                  {...register("price", { valueAsNumber: true })}
                />
                <Input
                  label="Discount (%)"
                  type="number"
                  error={errors.discount?.message}
                  {...register("discount", { valueAsNumber: true })}
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isLoading || isUploading}
                  className={cn(
                    "btn btn-primary px-8",
                    (isLoading || isUploading) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
