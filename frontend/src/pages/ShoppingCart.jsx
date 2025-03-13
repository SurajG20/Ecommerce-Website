import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApiClass from '../utils/api';
import CartProduct from '../components/CartProduct';
import { removeFromCart, clearCart, updateQuantity } from '../redux/features/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { AlertCircle, ArrowLeft, ShoppingBag, Trash2, CreditCard, X } from 'lucide-react';
import Layout from '../components/Layout';
import { toast } from 'sonner';

// Initialize Stripe outside component to avoid recreating it on every render
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showMsg, setShowMsg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleContinueShopping = () => {
    navigate(-1);
  };

  const handleDelete = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handlePayment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cart.products.length === 0) {
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const stripe = await getStripe();

      // Format products for the checkout session
      const lineItems = cart.products.map(product => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.title,
            images: [product.image],
            description: product.description,
            metadata: {
              id: product.id,
              size: product.size,
              color: product.color,
            },
          },
          unit_amount: Math.round(product.price * 100), // Stripe expects amount in smallest currency unit (paise)
        },
        quantity: product.quantity,
      }));

      // Create checkout session
      const response = await ApiClass.postRequest('/checkout/create-session', true, {
        line_items: lineItems,
        customer_email: user.email,
        metadata: {
          userId: user.id,
          cartId: Date.now().toString(), // Unique identifier for this cart checkout
        },
        success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cart`,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Clear cart on successful redirect
      dispatch(clearCart());
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during checkout';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
          {showMsg && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 p-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
                <AlertCircle size={20} />
                <p>Your cart is empty. Please add items to your cart before proceeding.</p>
                <button
                  onClick={() => setShowMsg(false)}
                  className="ml-auto hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto mt-4">
              <div className="flex items-center gap-2 p-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
                <AlertCircle size={20} />
                <p>{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleContinueShopping}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md border border-teal-700 hover:bg-teal-700 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingBag size={20} />
              <span className="text-lg">Items: {cart.totalQuantity}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => dispatch(clearCart())}
              disabled={cart.products.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-md border border-teal-700 hover:bg-teal-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              Empty Cart
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || cart.products.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard size={18} />
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2">
            {cart.products.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add items to your cart to see them here</p>
                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-600 transition-colors duration-200"
                >
                  <ArrowLeft size={18} />
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.products.map((product) => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{Math.round(Math.abs(cart.totalPrice))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span>-₹0.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-teal-700">
                      ₹{Math.round(Math.abs(cart.totalPrice))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCart;
