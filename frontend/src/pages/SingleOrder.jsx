import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder } from '../redux/features/orderSlice';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { format } from 'date-fns';
import { ArrowLeft, Package, Calendar, CreditCard, MapPin, Truck, FileText, User } from 'lucide-react';
import { toast } from 'sonner';

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

const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4 py-4 border-b last:border-0">
    <img
      src={item.image}
      alt={item.title}
      className="w-20 h-20 object-cover rounded-lg"
    />
    <div className="flex-1">
      <h4 className="font-medium">{item.title}</h4>
      <p className="text-sm text-muted-foreground">
        Size: {item.size} | Color: {item.color}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-medium">₹{item.price}</span>
        <span className="text-sm text-muted-foreground">x{item.quantity}</span>
      </div>
    </div>
  </div>
);

const SingleOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedOrder, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
  }, [dispatch, orderId]);

  if (error) {
    toast.error(error);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>

        {isLoading ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedOrder ? (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Order #{selectedOrder.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {format(new Date(selectedOrder.createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
                <OrderStatusBadge status={selectedOrder.orderStatus} />
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {selectedOrder.items.map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount</span>
                    <span className="text-xl font-bold">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder?.shippingAddress?.line1}
                    {selectedOrder?.shippingAddress?.line2 && selectedOrder?.shippingAddress?.line2}
                    <br />
                    {selectedOrder?.shippingAddress?.city}, {selectedOrder?.shippingAddress?.state} {selectedOrder?.shippingAddress?.postal_code}
                    <br />
                    {selectedOrder?.shippingAddress?.country}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Order Date:</span>
                      <span className="ml-2">
                        {format(new Date(selectedOrder.createdAt), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Payment Status:</span>
                      <Badge
                        variant={selectedOrder.paymentStatus === 'paid' ? 'success' : 'destructive'}
                        className="ml-2"
                      >
                        {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Customer Email:</span>
                      <span className="ml-2">{selectedOrder.customerEmail}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex items-center text-sm">
                        <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Tracking Number:</span>
                        <span className="ml-2">{selectedOrder.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Order not found</h3>
            <p className="text-muted-foreground mb-4">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleOrder;
