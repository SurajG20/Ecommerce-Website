import { Op } from 'sequelize';
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

  static async getAllOrders({ page = 1, limit = 10, status, startDate, endDate }) {
    try {
      const offset = (page - 1) * limit;

      const where = {};

      if (status) {
        where.orderStatus = status;
      }

      if (startDate && endDate) {
        where.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }

      const { count, rows: orders } = await Order.findAndCountAll({
        where,
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
      console.error('Error fetching all orders:', error);
      throw new Error('Failed to fetch orders');
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

  static async getUserOrders(userId, { page = 1, limit = 10, status }) {
    try {
      const offset = (page - 1) * limit;

      const where = { userId };

      if (status) {
        where.orderStatus = status;
      }

      const { count, rows: orders } = await Order.findAndCountAll({
        where,
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
}
