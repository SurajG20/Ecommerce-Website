import { OrderService } from '../services/order.service.js';
import ResponseHandler from '../utils/responseHandler.js';
import { validateGetOrder, validateGetOrders } from '../validations/order.validation.js';

export class OrderController {
  static async getOrderById(req, res) {
    try {
      const { error, value } = validateGetOrder.validate({
        params: req.params,
      });

      if (error) {
        return ResponseHandler.badRequest(res)(error.details[0].message);
      }

      const { orderId } = value.params;
      const order = await OrderService.getOrderById(orderId);

      if (!order) {
        return ResponseHandler.error(res)('Order not found');
      }

      if (order.userId !== req.user.id) {
        return ResponseHandler.error(res)('Unauthorized: Access denied');
      }

      return ResponseHandler.success(res)('Order retrieved successfully', order);
    } catch (error) {
      console.error('Error fetching order:', error);
      return ResponseHandler.error(res)(error.message || 'Failed to fetch order');
    }
  }

  static async getUserOrders(req, res) {
    try {
      const { error, value } = validateGetOrders.validate({
        query: req.query,
      });

      if (error) {
        return ResponseHandler.badRequest(res)(error.details[0].message);
      }

      const { page = 1, limit = 10, status } = value.query;

      const orders = await OrderService.getUserOrders(req.user.id, {
        page,
        limit,
        status,
      });

      return ResponseHandler.success(res)('User orders retrieved successfully', orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return ResponseHandler.error(res)(error.message || 'Failed to fetch user orders');
    }
  }
}
