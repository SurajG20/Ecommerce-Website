import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { getProducts, updateProduct } from "../../store/product-actions";
import Footer from "../Footer";
import Announcements from "../Announcement";
import Navbar from "../Navbar";

export default function UpdateProduct() {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const product = useSelector((state) =>
    state.product.products.products.find((i) => i._id === productId)
  );
  const [data, setData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
  });
  console.log(data);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [Previmg, setPrevimg] = useState(null);
  const [category, setCategory] = useState([product.category.join(",")]);
  const [size, setSize] = useState([product.size.join(",")]);
  const [color, setColor] = useState([product.color.join(",")]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const { isFetching } = useSelector((state) => state.product);

  const handleChange = useCallback((e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCategory = useCallback((e) => {
    setCategory(e.target.value.split(","));
  }, []);

  const handleSize = useCallback((e) => {
    setSize(e.target.value.split(","));
  }, []);

  const handleColor = useCallback((e) => {
    setColor(e.target.value.split(","));
  }, []);

  const handleUpload = useCallback(
    (e) => {
      e.preventDefault();

      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
          });
        }
      );
    },
    [file, img]
  );

  const handleUpdate = useCallback(() => {
    const products = {
      ...data,
      image: img ? img : product.image,
      category,
      size,
      color,
    };
    updateProduct(dispatch, productId, products);
    getProducts(dispatch);
    setSuccess(true);
  }, [data, img, category, size, color, productId, dispatch]);

  setTimeout(() => {
    if (success) {
      setSuccess(false);
    }
  }, 3000);
  return (
    <>
      <Announcements />
      <Navbar />
      <div className="flex flex-col items-center min-h-screen py-4 mx-auto ">
        <div className=" p-2">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold ml-8 ">Update Products</h1>
            <Link to="/admin">
              <button className="text-sm lg:text-md cursor-pointer uppercase px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition ease-out duration-500 mr-5">
                ALL PRODUCTS
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-16 p-8">
            <img
              className="w-full h-[90%] aspect-[3/4] object-cover "
              alt="preview image"
              src={Previmg ? Previmg : product.image}
            />
            <form className="col-span-2 mt-4 grid grid-cols-2 gap-x-10 gap-y-3">
              <div className="mb-4 flex gap-6 items-center">
                <label
                  className="text-gray-700 font-semibold border-2 border-gray-700 p-2 cursor-pointer rounded-lg "
                  htmlFor="file"
                >
                  Select File
                </label>
                <input
                  type="file"
                  id="file"
                  className=" hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPrevimg(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <button
                  onClick={handleUpload}
                  className=" px-3  rounded-lg text-white  cursor-pointer bg-black "
                >
                  <CloudUploadIcon />
                </button>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">Title</label>
                <input
                  type="text"
                  placeholder={product.title}
                  value={data.title}
                  className="w-full p-2 border"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={product.description}
                  value={data.description}
                  className="w-full p-2 border"
                  name="description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">
                  Categories
                </label>
                <input
                  type="text"
                  placeholder={product.category.join(",")}
                  value={category}
                  className="w-full p-2 border"
                  name="categories"
                  onChange={handleCategory}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">Size</label>
                <input
                  type="text"
                  placeholder={product.size.join(",")}
                  value={size}
                  className="w-full p-2 border"
                  onChange={handleSize}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">Color</label>
                <input
                  type="text"
                  placeholder={product.color.join(",")}
                  value={color}
                  className="w-full p-2 border"
                  onChange={handleColor}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">Price</label>
                <input
                  type="number"
                  placeholder={product.price}
                  name="price"
                  className="w-full p-2 border"
                  onClick={handleChange}
                  min={0}
                  defaultValue={data.price}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">Discount</label>
                <input
                  type="number"
                  placeholder={product.discount}
                  defaultValue={data.discount}
                  className="w-full p-2 border"
                  name="discount"
                  step={5}
                  min={5}
                  onClick={handleChange}
                  required
                />
              </div>
              <div className=" w-full  text-center col-span-2">
                <button
                  disabled={isFetching}
                  onClick={handleUpdate}
                  className="mt-4 px-10 py-2 rounded-lg bg-darkblue text-white font-semibold cursor-pointer bg-black "
                >
                  Update
                </button>
                <div className="my-2 ">
                  {error && (
                    <span className="text-red-500 ">
                      Something Went Wrong...
                    </span>
                  )}
                  {success && (
                    <span className="text-green-500 mt-4 ">
                      Updated successfully...
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
