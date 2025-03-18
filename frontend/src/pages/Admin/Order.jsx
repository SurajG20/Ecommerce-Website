import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders, updateOrderStatus, addTrackingNumber } from '../../redux/features/adminSlice';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { format } from 'date-fns';
import { Package, Calendar, CreditCard, MapPin, Filter } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

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

const OrderCard = ({ order, onStatusUpdate, onTrackingUpdate }) => {
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleStatusChange = async (newStatus) => {
    try {
      await onStatusUpdate({ orderId: order.id, status: newStatus });
    } catch{
      toast.error('Failed to update order status');
    }
  };

  const handleTrackingSubmit = async () => {
    try {
      await onTrackingUpdate({ orderId: order.id, trackingNumber });
      setShowTrackingDialog(false);
      setTrackingNumber('');
    } catch {
      toast.error('Failed to add tracking number');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Order #{order.id}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <OrderStatusBadge status={order.orderStatus} />
          {order.orderStatus === 'processing' && (
            <Select
              value={order.orderStatus}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shipped">Mark as Shipped</SelectItem>
                <SelectItem value="cancelled">Cancel Order</SelectItem>
              </SelectContent>
            </Select>
          )}
          {order.orderStatus === 'shipped' && !order.trackingNumber && (
            <Dialog open={showTrackingDialog} onOpenChange={setShowTrackingDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Tracking
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Tracking Number</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking">Tracking Number</Label>
                    <Input
                      id="tracking"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                    />
                  </div>
                  <Button onClick={handleTrackingSubmit}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
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
            {order.trackingNumber && (
              <div className="text-sm text-muted-foreground">
                Tracking: {order.trackingNumber}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Order = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error, currentOrderPage, totalOrderPages } = useSelector((state) => state.admin);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchAdminOrders({
      page: currentOrderPage,
      limit: 10,
      status: status === 'all' ? undefined : status
    }));
  }, [dispatch, currentOrderPage, status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    dispatch(fetchAdminOrders({
      page: 1,
      limit: 10,
      status: newStatus === 'all' ? undefined : newStatus
    }));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchAdminOrders({
      page: newPage,
      limit: 10,
      status: status === 'all' ? undefined : status
    }));
  };

  const handleStatusUpdate = async ({ orderId, status }) => {
    await dispatch(updateOrderStatus({ orderId, status })).unwrap();
  };

  const handleTrackingUpdate = async ({ orderId, trackingNumber }) => {
    await dispatch(addTrackingNumber({ orderId, trackingNumber })).unwrap();
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center space-x-4">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
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
          <p className="text-muted-foreground">
            {status === 'all' ? 'No orders have been placed yet' : `No ${status} orders found`}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
                onTrackingUpdate={handleTrackingUpdate}
              />
            ))}
          </div>

          {totalOrderPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentOrderPage - 1)}
                disabled={currentOrderPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentOrderPage + 1)}
                disabled={currentOrderPage === totalOrderPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Order;