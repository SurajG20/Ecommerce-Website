import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
const CartProduct = ({ product, handleDelete }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row'>
        {/* Image */}
        <div className='md:mr-24 mb-8 md:mb-0'>
          <img className='w-full h-full md:w-64 md:h-64 object-cover object-top' src={product.image} />
        </div>
        {/* Details */}
        <div className='flex justify-between items-start w-full'>
          <div className='flex flex-col gap-6'>
            <div>
              <span className='font-semibold text-xl'>Product :</span>{' '}
              <span className='font-light text-pretty tracking-wide'>{product.title}</span>
            </div>
            <div>
              <span className='font-semibold text-xl'>Size :</span>{' '}
              <span className='font-light text-pretty tracking-wide'>{product.size}</span>
            </div>
            <div>
              <span className='font-semibold text-xl'>Color :</span>{' '}
              <span className='font-light text-pretty tracking-wide'>{product.color}</span>
            </div>
            <div>
              <span className='font-semibold text-xl'>Quantity :</span>{' '}
              <span className='font-light text-pretty tracking-wide'>{product.quantity}</span>
            </div>
            {/* <div>
            <span className="font-bold">ID:</span> {product._id}
          </div> */}
          </div>
          <div className='flex flex-col items-start justify-start sm:items-end gap-6'>
            <button className='cursor-pointer' onClick={() => handleDelete(product)}>
              <MdDeleteOutline size={48} />
            </button>
            {/* <span className='mx-2 text-xl h-6 w-6 rounded-xl border flex justify-center items-center'>
          {product.quantity}
        </span> */}
            <span className=' text-2xl  tracking-wide font-medium'>
              ₹{Math.round(Math.abs((product.quantity * product.price).toFixed(2)))}
            </span>
          </div>
        </div>
      </div>
      {/* Price */}
    </div>
  );
};

export default CartProduct;
