import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { XCircle } from 'lucide-react';
import Layout from '../components/Layout';

const Cancel = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-4">
        <XCircle className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold">Payment Cancelled</h1>
        <p className="text-gray-600 max-w-md">
          Your payment was cancelled. If you have any questions, please contact our support team.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild>
            <Link to="/cart">Return to Cart</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Cancel;
