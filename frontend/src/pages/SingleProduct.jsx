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
import Layout from "../components/Layout";

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
    <Layout>
      <section className='p-8 grid md:grid-cols-2 gap-8'>
        <div className='flex-1 w-[45%] h-[40vh] sm:h-[90vh] m-auto  '>
          <img src={product.image} className='object-cover border-2 p-2 rounded-sm' />
        </div>
        <div className='grow'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-semibold '>{product.title}</h2>
            <p className=' text-md'>{product.description}</p>
            <span className=' text-md font-bold'>₹ {product.price}</span>
            {/* Color and Size Container */}
            <div className='flex justify-between sm:w-1/2 space-x-3 '>
              {/* Color */}
              <div className='flex items-center space-x-2 '>
                <span className='text-md'>Color :</span>
                {product.color?.map((c) => (
                  <div
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-[15px] h-[15px] rounded-full border ${color === c && 'ring border-0'} ${colorClass(
                      c
                    )} mx-[5px] cursor-pointer `}
                  ></div>
                ))}
              </div>
              {/* Size */}
              <div className='flex items-center '>
                <span className='text-md  '>Size</span>
                <select onChange={(e) => setSize(e.target.value)} className=' px-[4px] py-[2px] outline-none w-12'>
                  {product.size?.map((s) => (
                    <option key={s} value={s} className=''>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Cart and Quantity Container */}
            <div className='grid sm:grid-cols-3 items-center '>
              {/* Quantity Counter */}
              <div className='flex items-center justify-start'>
                <span className='cursor-pointer' onClick={() => handleQuantity('dec')}>
                  <Remove />
                </span>
                <span className='mx-2 text-md h-6 w-6 rounded-2xl border flex justify-center items-center'>
                  {quantity}
                </span>
                <span className='cursor-pointer' onClick={() => handleQuantity('inc')}>
                  <Add />
                </span>
              </div>
              {/* Cart Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className=' hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-4 py-[3px]'
                >
                  Add to cart
                </button>
              </div>
              {/* Alert Component */}
              <div className={`mt-4 sm:w-3/4 lg:w-full  transition duration-300 ${!showMsg && 'opacity-0'}`}>
                <Alert variant='outlined' color='success' onClose={() => setShowMsg(false)}>
                  Added to cart
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleProduct;
