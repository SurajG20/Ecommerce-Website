import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct, getProducts } from "../../store/product-actions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DefaultImage from "../../assets/default-image.jpg";
const AddProduct = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
  });
  const [file, setFile] = useState(null);
  const [Previmg, setPrevimg] = useState(null);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const { isFetching } = useSelector((state) => state.product);

  const handleChange = useCallback((e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
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
          const products = {
            ...inputs,
            image: downloadURL,
            category,
            size,
            color,
          };
          addProduct(dispatch, products);
          getProducts(dispatch);
          setSuccess(true);
          setInputs({
            title: "",
            description: "",
            price: "",
            discount: "",
          });
          setCategory([]);
          setSize([]);
          setColor([]);
          setFile(null);
          setPrevimg(null);
          setSuccess(true);
        });
      }
    );
  };

  setTimeout(() => {
    setSuccess(false);
    setError(false);
  }, 5000);
  return (
    <div className=" p-2">
      <h1 className="text-2xl font-semibold ml-8 ">New Product</h1>
      <div className="grid grid-cols-3 gap-x-16 p-8">
        <img
          className="w-full h-[90%] object-cover"
          alt="preview image"
          src={Previmg ? Previmg : DefaultImage}
        />
        <form className="col-span-2 mt-4 grid grid-cols-2 gap-x-10 gap-y-3">
          <div className="mb-4 flex gap-6 items-center">
            <label
              className="text-gray-700 font-semibold flex items-center gap-5 "
              htmlFor="file"
            >
              UPLOAD <CloudUploadIcon className="text-4xl" />
            </label>
            <input
              type="file"
              id="file"
              className=" hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setPrevimg(URL.createObjectURL(e.target.files[0]));
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              placeholder="Puma Shoes"
              className="w-full p-2 border"
              name="title"
              onChange={handleChange}
              value={inputs.title}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Description</label>
            <input
              type="text"
              placeholder="Description about product"
              className="w-full p-2 border"
              name="description"
              onChange={handleChange}
              required
              value={inputs.description}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Categories</label>
            <input
              type="text"
              placeholder="jeans, t-shirt, shoes"
              className="w-full p-2 border"
              name="categories"
              onChange={handleCategory}
              required
              value={category}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Size</label>
            <input
              type="text"
              placeholder="34, 36, 38"
              className="w-full p-2 border"
              onChange={handleSize}
              required
              value={size}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Color</label>
            <input
              type="text"
              placeholder="red, blue, green"
              className="w-full p-2 border"
              onChange={handleColor}
              required
              value={color}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Price</label>
            <input
              type="number"
              placeholder="50₹"
              name="price"
              className="w-full p-2 border"
              onClick={handleChange}
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Discount</label>
            <input
              type="number"
              placeholder="25%"
              className="w-full p-2 border"
              name="discount"
              step={5}
              min={5}
              onClick={handleChange}
              required
            />
          </div>
          <div className=" w-full text-center col-span-2">
            <button
              disabled={isFetching}
              onClick={handleSubmit}
              className="mt-4 px-10 py-2 rounded-lg bg-darkblue text-white font-semibold cursor-pointer bg-black "
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {error && <span className="text-red-500 ">Something Went Wrong...</span>}
      {success && (
        <span className="text-green-500 mt-4 ">Created successfully...</span>
      )}
    </div>
  );
};
export default AddProduct;
