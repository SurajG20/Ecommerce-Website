import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import config from '../config/config';
const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/stripe', { products });

      const stripe = await loadStripe(config.stripeKey);

      const result = await stripe.redirectToCheckout({
        sessionId: data.data.id,
      });

      if (result.error) {
        toast.error('Payment failed. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading || products.length === 0}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Checkout'
      )}
    </Button>
  );
};

export default CheckoutButton;