import Order from '../models/Order.js';
import User from '../models/User.js';

export class OrderService {
  static async create(orderDetails) {
    try {
      const {
        userId,
        customerId,
        customerEmail,
        customerName,
        items,
        totalAmount,
        currency,
        paymentStatus,
        paymentIntentId,
        shippingAddress,
      } = orderDetails;

      const order = await Order.create({
        userId,
        customerId,
        customerEmail,
        customerName,
        items,
        totalAmount,
        currency,
        paymentStatus,
        paymentIntentId,
        shippingAddress,
      });

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  static async getOrderById(orderId) {
    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  static async getUserOrders(userId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows: orders } = await Order.findAndCountAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      return {
        orders,
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error('Failed to fetch user orders');
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new Error('Order not found');
      }

      await order.update({ orderStatus: status });
      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  static async updatePaymentStatus(orderId, paymentStatus) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new Error('Order not found');
      }

      await order.update({ paymentStatus });
      return order;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  static async addTrackingNumber(orderId, trackingNumber) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new Error('Order not found');
      }

      await order.update({ trackingNumber });
      return order;
    } catch (error) {
      console.error('Error adding tracking number:', error);
      throw new Error('Failed to add tracking number');
    }
  }
}
