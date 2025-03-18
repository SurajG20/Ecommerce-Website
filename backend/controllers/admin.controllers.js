import { AdminService } from '../services/admin.service.js';
import { MaintenanceService } from '../services/maintenance.services.js';
import { OrderService } from '../services/order.service.js';
import responseHandler from '../utils/responseHandler.js';
import {
  getUsersQuerySchema,
  toggleMaintenanceModeSchema,
  updateUserStatusSchema,
} from '../validations/admin.validation.js';
import {
  validateAddTrackingNumber,
  validateGetOrders,
  validateUpdateOrderStatus,
} from '../validations/order.validation.js';

export class AdminController {
  static async getAllUsers(req, res) {
    try {
      const { error, value } = getUsersQuerySchema.validate(req.query);
      if (error) {
        return responseHandler.badRequest(res)(error.details[0].message);
      }

      const result = await AdminService.getAllUsers(value);
      return responseHandler.success(res)('Users fetched successfully', result);
    } catch (error) {
      return responseHandler.error(res)('Error fetching users');
    }
  }

  static async getUserDetails(req, res) {
    try {
      const { userId } = req.params;
      const user = await AdminService.getUserDetails(userId);

      if (!user) {
        return responseHandler.notFound(res)('User not found');
      }

      return responseHandler.success(res)(user);
    } catch (error) {
      return responseHandler.error(res)('Error fetching user details');
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { error, value } = updateUserStatusSchema.validate(req.body);
      if (error) {
        return responseHandler.error(res)(error.details[0].message);
      }

      const { userId } = req.params;
      const user = await AdminService.getUserDetails(userId);

      if (!user) {
        return responseHandler.error(res)('User not found');
      }
      const result = await AdminService.updateUserStatus(userId, value.isBlocked);
      if (result !== 1) {
        return responseHandler.error(res)('Error updating user status');
      }

      return responseHandler.success(res)('User status updated successfully', { user });
    } catch (error) {
      console.log(error);
      return responseHandler.error(res)('Error updating user status');
    }
  }

  static async toggleMaintenanceMode(req, res) {
    try {
      const { error, value } = toggleMaintenanceModeSchema.validate(req.body);
      if (error) {
        return responseHandler.badRequest(res)(error.details[0].message);
      }

      const setting = await MaintenanceService.toggleMaintenanceMode(value.enabled, req.user.id);
      return responseHandler.success(res)(`Maintenance mode ${value.enabled ? 'enabled' : 'disabled'} successfully`, {
        maintenanceMode: setting.value,
      });
    } catch (error) {
      return responseHandler.error(res)('Error toggling maintenance mode');
    }
  }

  static async getMaintenanceMode(req, res) {
    try {
      const enabled = await MaintenanceService.getMaintenanceMode();
      return responseHandler.success(res)('Maintenance mode status fetched successfully', {
        enabled,
      });
    } catch (error) {
      console.error(error);
      return responseHandler.error(res)('Error fetching maintenance mode status');
    }
  }

  static async getAllOrders(req, res) {
    try {
      const { error, value } = validateGetOrders.validate({
        query: req.query,
      });
      if (error) {
        return responseHandler.error(res)(error.details[0].message);
      }

      const { page = 1, limit = 10, status, startDate, endDate } = value.query;

      const orders = await OrderService.getAllOrders({
        page,
        limit,
        status,
        startDate,
        endDate,
      });

      return responseHandler.success(res)('Orders retrieved successfully', orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return responseHandler.error(res)('Failed to fetch orders');
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);

      if (!order) {
        return responseHandler.notFound(res)('Order not found');
      }

      return responseHandler.success(res)('Order details retrieved successfully', order);
    } catch (error) {
      console.error('Error fetching order details:', error);
      return responseHandler.error(res)('Failed to fetch order details');
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { error, value } = validateUpdateOrderStatus.validate({
        body: req.body,
      });

      if (error) {
        return responseHandler.badRequest(res)(error.details[0].message);
      }

      const { orderId } = req.params;
      const { status } = value.body;

      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return responseHandler.notFound(res)('Order not found');
      }

      await OrderService.updateOrderStatus(orderId, status);
      return responseHandler.success(res)('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      return responseHandler.error(res)('Failed to update order status');
    }
  }

  static async addTrackingNumber(req, res) {
    try {
      const { error, value } = validateAddTrackingNumber.validate({
        body: req.body,
      });

      if (error) {
        return responseHandler.badRequest(res)(error.details[0].message);
      }

      const { orderId } = req.params;
      const { trackingNumber } = value.body;

      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return responseHandler.notFound(res)('Order not found');
      }

      await OrderService.addTrackingNumber(orderId, trackingNumber);
      return responseHandler.success(res)('Tracking number added successfully');
    } catch (error) {
      console.error('Error adding tracking number:', error);
      return responseHandler.error(res)('Failed to add tracking number');
    }
  }
}
