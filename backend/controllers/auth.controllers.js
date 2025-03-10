import { AuthService } from '../services/auth.service.js';
import { createUserSchema, loginSchema } from '../validations/user.validation.js';
import responseHandler from '../utils/responseHandler.js';

export class AuthController {
  static async register(req, res) {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }

    const result = await AuthService.register(value);
    return responseHandler.success(res)('User registered successfully', result);
  }

  static async login(req, res) {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }
    
    const result = await AuthService.login(value.email, value.password);
    return responseHandler.success(res)('Logged in successfully', result);
  }

  static async logout(req, res) {
    return responseHandler.success(res)('Logged out successfully');
  }
}
