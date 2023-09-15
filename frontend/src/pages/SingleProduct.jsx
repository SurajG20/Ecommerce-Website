import React, { useState, useEffect, useCallback } from "react";

import { Add, Remove } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { publicRequest } from "../request-methods";
import { addProduct } from "../store/cart-slice";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Alert } from "@mui/material";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("red");
  const [showMsg, setShowMsg] = useState(false);

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

  const handleSubmit = useCallback(() => {
    dispatch(addProduct({ product, quantity, color, size }));
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 3000);
  }, [product, quantity, color, size]);

  const handleQuantity = useCallback((type) => {
    if (type === "dec") {
      setQuantity((prev) => {
        return prev > 1 ? prev - 1 : 1;
      });
    } else {
      setQuantity((prev) => prev + 1);
    }
  }, []);

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
                className=" p-[5px] outline-none w-12"
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
                onClick={() => handleQuantity("dec")}
              >
                <Remove />
              </span>
              <span className="mx-2 text-xl h-10 w-10 rounded-2xl border flex justify-center items-center">
                {quantity}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleQuantity("inc")}
              >
                <Add />
              </span>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4"
              >
                Add to cart
              </button>
            </div>
            <div
              className={`mt-4 sm:w-3/4 lg:w-full  transition duration-300 ${
                !showMsg && "opacity-0"
              }`}
            >
              <Alert
                variant="outlined"
                color="success"
                onClose={() => setShowMsg(false)}
              >
                Added to cart
              </Alert>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleProduct;
