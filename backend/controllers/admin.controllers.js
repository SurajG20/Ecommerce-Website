import { AdminService } from '../services/admin.service.js';
import responseHandler from '../utils/responseHandler.js';
import { getUsersQuerySchema, updateUserStatusSchema } from '../validations/admin.validation.js';

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
        return responseHandler.badRequest(res)(error.details[0].message);
      }

      const { userId } = req.params;
      const user = await AdminService.getUserDetails(userId);

      if (!user) {
        return responseHandler.notFound(res)('User not found');
      }
      const result = await AdminService.updateUserStatus(userId, value.isBlocked);
      if (!result.success) {
        return responseHandler.error(res)(result.message);
      }

      return responseHandler.success(res)(result);
    } catch (error) {
      console.log(error);
      return responseHandler.error(res)('Error updating user status');
    }
  }
}
