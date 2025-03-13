import { Minus, Plus, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const CartProduct = ({ product, onDelete, onUpdateQuantity }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = product.quantity + change;
    onUpdateQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg bg-white">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.size && (
            <span className="text-sm text-gray-600">
              Size: <span className="font-medium">{product.size}</span>
            </span>
          )}
          {product.color && (
            <span className="text-sm text-gray-600">
              Color: <span className="font-medium">{product.color}</span>
            </span>
          )}
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={product.quantity <= 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center">{product.quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">₹{product.price * product.quantity}</div>
          <div className="text-sm text-gray-500">₹{product.price} each</div>
        </div>
        <button
          onClick={() => onDelete(product)}
          className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartProduct;
