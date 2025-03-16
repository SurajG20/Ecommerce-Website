import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/features/cartSlice';
import { Button } from '../components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-gray-600 max-w-md">
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild>
            <Link to="/orders">View Orders</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
