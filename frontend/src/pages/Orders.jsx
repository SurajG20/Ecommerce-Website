import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/features/orderSlice';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { format } from 'date-fns';
import { Package, Calendar, CreditCard, MapPin, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const OrderStatusBadge = ({ status }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Badge className={statusColors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Order #{order.id}
        </CardTitle>
        <OrderStatusBadge status={order.orderStatus} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {order.shippingAddress?.city}, {order.shippingAddress?.state}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{order.items.length} items</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error, currentPage, totalPages } = useSelector((state) => state.orders);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    dispatch(fetchOrders({ page: 1, limit: 10, status: newStatus }));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchOrders({ page: newPage, limit: 10, status }));
  };

  if (error) {
    toast.error(error);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <div className="flex space-x-2 mb-6">
            <Button
              variant={status === '' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('')}
            >
              All Orders
            </Button>
            <Button
              variant={status === 'pending' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('pending')}
            >
              Pending
            </Button>
            <Button
              variant={status === 'processing' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('processing')}
            >
              Processing
            </Button>
            <Button
              variant={status === 'shipped' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('shipped')}
            >
              Shipped
            </Button>
            <Button
              variant={status === 'delivered' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('delivered')}
            >
              Delivered
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-48" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {status ? `No ${status} orders found` : 'You haven\'t placed any orders yet'}
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
