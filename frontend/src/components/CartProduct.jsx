import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const CartProduct = ({ product, handleDelete }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:mr-8 mb-8 md:mb-0">
          <img className="w-full h-full md:w-48 md:h-48" src={product.image} />
        </div>
        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-bold">Product:</span> {product.title}
          </div>
          <div>
            <span className="font-bold">ID:</span> {product._id}
          </div>
          <div>
            <span className="font-bold">Size:</span> {product.size}
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className="cursor-pointer"
          onClick={() => handleDelete(product)}
        >
          <DeleteForeverOutlinedIcon />
        </button>
        <span className="mx-2 text-xl h-6 w-6 rounded-xl border flex justify-center items-center">
          {product.quantity}
        </span>
        <span className="block text-2xl">
          ₹{Math.round(Math.abs((product.quantity * product.price).toFixed(2)))}
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
