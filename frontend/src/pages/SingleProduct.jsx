import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, ShoppingCart, AlertCircle, X } from 'lucide-react';
import { addToCart } from '../redux/features/cartSlice';
import { fetchSingleProduct } from '../redux/features/productSlice';
import Layout from '../components/Layout';
import { toast } from 'sonner';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, isLoading: loading, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const colorStyles = {
    white: 'bg-white border-2',
    black: 'bg-black',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      if (product.size?.length > 0) setSize(product.size[0]);
      if (product.color?.length > 0) setColor(product.color[0]);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!size || !color) {
      toast.error('Please select both size and color');
      return;
    }

    const cartItem = {
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity,
      size,
      color,
    };

    dispatch(addToCart(cartItem));
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-700"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-4">
            <div className="flex items-center gap-2 p-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
              <AlertCircle size={20} />
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="ml-auto hover:text-red-600">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="text-2xl font-bold text-teal-700">
              ₹{product.price}
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="flex gap-2">
                {product.color?.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`
                      w-10 h-10 rounded-full ${colorStyles[c]}
                      ${color === c ? 'ring-2 ring-offset-2 ring-teal-700' : ''}
                      transition-all duration-200
                    `}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <div className="flex gap-2">
                {product.size?.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`
                      px-4 py-2 border rounded-md
                      ${size === s ? 'bg-teal-700 text-white border-teal-700' : 'border-gray-300 hover:border-teal-700'}
                      transition-all duration-200
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full py-3 px-8 bg-teal-700 text-white rounded-md hover:bg-teal-600 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
