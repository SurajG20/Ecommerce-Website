import { UserService } from './user.service.js';
import { JWTService } from './jwt.service.js';
import { CustomError } from '../errors/index.js';
import User from '../models/User.js';

export class AuthService {
  static async register(userData) {
    const isFirstAccount = await User.count() === 0;
    userData.role = isFirstAccount ? 'admin' : 'user';

    const user = await UserService.createUser(userData);
    const token = JWTService.generateAuthToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  static async login(email, password) {
    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');
    }

    const token = JWTService.generateAuthToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
} 