import User from '../models/User.js';
import { CustomError } from '../errors/index.js';
import { Op } from 'sequelize';

export class UserService {
  static async createUser(userData) {
    const existingUser = await User.findOne({ 
      where: { email: userData.email }
    });
    
    if (existingUser) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    const user = await User.create(userData);
    return user;
  }

  static async findUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }
    return user;
  }

  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async updateUser(id, updateData) {
    const user = await this.findUserById(id);
    
    if (updateData.email) {
      const existingUser = await User.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: id }
        }
      });
      
      if (existingUser) {
        throw new CustomError.BadRequestError('Email already exists');
      }
    }

    return await user.update(updateData);
  }

  static async deleteUser(id) {
    const user = await this.findUserById(id);
    await user.destroy();
    return true;
  }
} 