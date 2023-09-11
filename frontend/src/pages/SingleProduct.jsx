import React, { useState, useEffect } from "react";

import { Add, Remove } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { publicRequest } from "../request-methods";
import { addProduct } from "../store/cart-slice";

import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState("S");
  let [color, setColor] = useState("red");
  const colorClass = (color) => {
    switch (color) {
      case "white":
        return "bg-[white]";
      case "black":
        return "bg-[black]";
      case "red":
        return "bg-[red]";
      case "blue":
        return "bg-[blue]";
      case "green":
        return "bg-[green]";
      case "yellow":
        return "bg-[yellow]";
    }
  };
  const getProduct = async () => {
    try {
      const url = `/products/${id}`;
      const response = await publicRequest.get(url);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
  };
  // const colorChangeHandler = (e) => {
  //   setSize(e.target.value);
  // };
  const addToCartHandler = () => {
    dispatch(addProduct({ product, size, quantity }));
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Announcement />
      <Navbar />
      <section className="p-8 grid md:grid-cols-2 gap-8">
        <div className="grow">
          <img
            src={product.image}
            alt={product.title}
            className="w-[70%] h-[70%] object-cover"
          />
        </div>
        <div className="grow">
          <h2 className="text-5xl mb-6">{product.title}</h2>
          <p className="mb-6 text-xl">{product.description}</p>
          <span className="block mb-6 text-4xl">₹ {product.price}</span>
          <div className="flex justify-between sm:w-1/2 my-[30px] space-x-3 ">
            <div className="flex items-center space-x-2 ">
              <span className="text-[20px] mr-2  ">Color :</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-[20px] h-[20px] rounded-full border ${
                    color === c && "ring border-0"
                  } ${colorClass(c)} mx-[5px] cursor-pointer `}
                ></div>
              ))}
            </div>

            <div className="flex items-center ">
              <span className="text-[20px] font-extralight ">Size</span>
              <select
                onChange={(e) => setSize(e.target.value)}
                className=" p-[5px] outline-none"
              >
                {product.size?.map((s) => (
                  <option key={s} value={s} className="">
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-start">
              <span
                className="cursor-pointer"
                onClick={() => {
                  quantity > 1 && setQuantity(quantity--);
                }}
              >
                <Remove />
              </span>
              <span className="mx-2 text-xl h-10 w-10 rounded-2xl border flex justify-center items-center">
                {quantity}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setQuantity(quantity++);
                }}
              >
                <Add />
              </span>
            </div>
            <div>
              <button
                onClick={addToCartHandler}
                className="uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleProduct;
