import { AdminService } from '../services/admin.service.js';
import { MaintenanceService } from '../services/maintenance.services.js';
import responseHandler from '../utils/responseHandler.js';
import {
  getUsersQuerySchema,
  toggleMaintenanceModeSchema,
  updateUserStatusSchema,
} from '../validations/admin.validation.js';

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
}
