import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  const [overlayIsShown, setOverlayIsShown] = useState(false);
  const discountPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <figure
      className="relative p-4 border border-gray-300 rounded-sm bg-white hover:shadow-md transition-shadow duration-300 ease-in-out"
      onMouseEnter={() => {
        setOverlayIsShown(true);
      }}
      onMouseLeave={() => {
        setOverlayIsShown(false);
      }}
    >
      <div className="aspect-square overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top ease-in group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm md:text-base capitalize mb-2 text-black">
          <Link
            to={`/products/${product.id}`}
            className="cursor-pointer line-clamp-1 font-urbanist"
          >
            {product.title}
          </Link>
        </div>
      </div>
      <div className="flex mb-2 gap-1 items-center">
        <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
          <span>{product.rating}</span>
          <Star className="h-3 w-3 md:h-4 md:w-4" />
        </div>
      </div>
      <div className="text-sm text-black flex gap-2">
        <span className="font-semibold whitespace-nowrap">
          ₹{discountPrice?.toFixed(2)}
        </span>
        <span className="line-through whitespace-nowrap">₹{product.price}</span>
        <span className="text-green-600 whitespace-nowrap">
          {product.discount}% off
        </span>
      </div>

      {overlayIsShown && (
        <Link
          to={`/products/${product.id}`}
          className="cursor-pointer absolute top-0 left-0 w-full h-full bg-black/10 flex justify-center items-center"
        />
      )}
    </figure>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
