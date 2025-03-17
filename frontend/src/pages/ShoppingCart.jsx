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
import config from '../config/config';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.stripePublicKey);
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
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      }));

      const response = await ApiClass.postRequest('/stripe/create-session', true, {
        line_items: lineItems,
        customer_email: user.email,
        metadata: {
          userId: user.id,
          cartId: Date.now().toString(),
        },
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

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
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-center mb-6 text-foreground">Shopping Cart</h1>
            {showMsg && (
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 p-4 text-destructive border border-destructive/20 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-5 w-5" />
                  <p>Your cart is empty. Please add items to your cart before proceeding.</p>
                  <button
                    onClick={() => setShowMsg(false)}
                    className="ml-auto hover:text-destructive/80 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="flex items-center gap-3 p-4 text-destructive border border-destructive/20 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto hover:text-destructive/80 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleContinueShopping}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-lg font-medium">{cart.totalQuantity} Items</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                disabled={cart.products.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
                Empty Cart
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing || cart.products.length === 0}
                className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <CreditCard className="h-4 w-4" />
                {isProcessing ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {cart.products.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-lg border shadow-sm">
                  <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-medium text-card-foreground mb-3">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Add items to your cart to see them here</p>
                  <button
                    onClick={handleContinueShopping}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
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

            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border p-8 sticky top-8">
                <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{Math.round(Math.abs(cart.totalPrice))}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span className="font-medium">-₹0.00</span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-card-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{Math.round(Math.abs(cart.totalPrice))}
                      </span>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing || cart.products.length === 0}
                      className="w-full mt-6 flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <CreditCard className="h-4 w-4" />
                      {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
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

// 4000003560000008