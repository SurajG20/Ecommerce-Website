import { AuthService } from '../services/auth.service.js';
import responseHandler from '../utils/responseHandler.js';
import { createUserSchema, loginSchema } from '../validations/user.validation.js';

export class AuthController {
  static async register(req, res) {
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }

    const user = await AuthService.findUser(value.email);

    if (user) {
      return responseHandler.error(res)('User already exists');
    }

    const savedUser = await AuthService.createUser(value);

    if (!savedUser) {
      return responseHandler.error(res)('User registration failed');
    }

    const result = await AuthService.generateToken(savedUser);
    return responseHandler.success(res)('User registered successfully', result);
  }

  static async login(req, res) {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }

    const user = await AuthService.findUser(value.email);
    if (!user) {
      return responseHandler.error(res)('Account with this email not found');
    }

    const isPasswordValid = await AuthService.verifyPassword(value.password, user);

    if (!isPasswordValid) {
      return responseHandler.error(res)('Wrong password');
    }

    const result = await AuthService.createToken(user);
    return responseHandler.success(res)('Logged in successfully', result);
  }

  static async logout(req, res) {
    return responseHandler.success(res)('Logged out successfully');
  }
}
