import User from '../models/User.js';
import { Op } from 'sequelize';
import ResponseHandler from '../utils/responseHandler.js';

export class UserService {
  static async createUser(userData) {
    const existingUser = await User.findOne({ 
      where: { email: userData.email }
    });
    
    if (existingUser) {
      return ResponseHandler.error('Email already exists');
    }

    const user = await User.create(userData);
    return user;
  }

  static async findUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return ResponseHandler.notFound('User not found');
    }
    return user;
  }

  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ResponseHandler.notFound('User not found');
    }
    return user;
  }

  static async updateUser(id, updateData) {
    const user = await this.findUserById(id);
    if (user.success === false) return user;
    
    if (updateData.email) {
      const existingUser = await User.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: id }
        }
      });
      
      if (existingUser) {
        return ResponseHandler.error('Email already exists');
      }
    }

    return await user.update(updateData);
  }

  static async deleteUser(id) {
    const user = await this.findUserById(id);
    if (user.success === false) return user;
    
    await user.destroy();
    return true;
  }
} 