import User from '../models/User.js';
import { JWTService } from './jwt.service.js';
import { UserService } from './user.service.js';

export class AuthService {
  static async generateToken(user) {
    const token = JWTService.generateAuthToken(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async createUser(userData) {
    const isFirstAccount = (await User.count()) === 0;
    userData.role = isFirstAccount ? 'admin' : 'user';

    const user = await UserService.createUser(userData);
    return user;
  }

  static async createToken(user) {
    const token = JWTService.generateAuthToken(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async findUser(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async verifyPassword(password, user) {
    return await user.comparePassword(password);
  }
}
