import React, { useState, useEffect, useCallback } from 'react';

import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { publicRequest } from '../request-methods';
import { addProduct } from '../store/cart-slice';

import { Alert } from '@mui/material';
import Layout from '../components/Layout';

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('red');
  const [showMsg, setShowMsg] = useState(false);

  const colorClass = (color) => {
    switch (color) {
      case 'white':
        return 'bg-[white]';
      case 'black':
        return 'bg-[black]';
      case 'red':
        return 'bg-[red]';
      case 'blue':
        return 'bg-[blue]';
      case 'green':
        return 'bg-[green]';
      case 'yellow':
        return 'bg-[yellow]';
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
    if (type === 'dec') {
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
      <section className='p-8 grid md:grid-cols-2 gap-8 min-h-screen'>
        <div className='self-start aspect-square mx-auto w-64 sm:w-96 h-96'>
          <img src={product.image} className='object-cover w-full h-full object-top border-2 p-2 rounded-sm' />
        </div>
        <div className=''>
          <div className='flex flex-col gap-x-3 gap-y-2'>
            <h2 className='text-4xl font-semibold '>{product.title}</h2>
            <p className=' text-md font-light'>{product.description}</p>
            <span className=' text-lg font-bold'>₹ {product.price}</span>
            {/* Color and Size Container */}
            <div className='flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:w-1/2 gap-x-3 gap-y-4 sm:items-center'>
              {/* Color */}
              <div className='flex items-center gap-x-2 '>
                <span className='text-xl'>Color :</span>
                {product.color?.map((c) => (
                  <div
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border ${color === c && 'ring border-0'} ${colorClass(
                      c
                    )} mx-[5px] cursor-pointer `}
                  ></div>
                ))}
              </div>
              {/* Size */}
              <div className='flex items-center gap-x-2'>
                <span className='text-xl  whitespace-nowrap '>Size :</span>
                <select
                  onChange={(e) => setSize(e.target.value)}
                  className=' w-full py-1 px-2 bg-white border border-gray-300 rounded-md'
                >
                  <option value='' disabled>
                    Select Size
                  </option>
                  {product.size?.map((s) => (
                    <option key={s} value={s} className=''>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Cart and Quantity Container */}
            <div className='grid grid-cols-1 items-start sm:grid-cols-3 gap-y-4 sm:items-center  '>
              {/* Quantity Counter */}
              <div className='flex items-center justify-start gap-x-3'>
                <span className='cursor-pointer' onClick={() => handleQuantity('dec')}>
                  <Remove />
                </span>
                <span className='mx-2 text-lg h-8 w-8 rounded-2xl border flex justify-center items-center'>
                  {quantity}
                </span>
                <span className='cursor-pointer ' onClick={() => handleQuantity('inc')}>
                  <Add />
                </span>
              </div>
              {/* Cart Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className=' hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3'
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
