import { Op } from 'sequelize';
import User from '../models/User.js';

export class AdminService {
  static async getAllUsers({ page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc', isBlocked }) {
    const offset = (page - 1) * limit;
    const whereClause = {
      role: 'user',
    };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (typeof isBlocked === 'boolean') {
      whereClause.isBlocked = isBlocked;
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
      attributes: { exclude: ['password'] },
    });

    return {
      users: rows,
      totalUsers: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };
  }

  static async updateUserStatus(userId, isBlocked) {
    const [result] = await User.update({ isBlocked }, { where: { id: userId } });
    return result;
  }

  static async getUserDetails(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
        role: 'user',
      },
      attributes: { exclude: ['password'] },
    });
    return user;
  }
}
