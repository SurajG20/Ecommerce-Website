import PaymentLog from '../models/PaymentLog.js';
import User from '../models/User.js';

export class PaymentLogService {
  static async create(failureDetails) {
    try {
      const {
        userId,
        customerId,
        customerEmail,
        customerName,
        paymentIntentId,
        amount,
        currency,
        errorCode,
        errorMessage,
        errorType,
        metadata,
      } = failureDetails;

      const paymentLog = await PaymentLog.create({
        userId,
        customerId,
        customerEmail,
        customerName,
        paymentIntentId,
        amount,
        currency,
        errorCode,
        errorMessage,
        errorType,
        metadata,
      });

      return paymentLog;
    } catch (error) {
      console.error('Error creating payment log:', error);
      throw new Error('Failed to create payment log');
    }
  }

  static async getPaymentLogById(logId) {
    try {
      const paymentLog = await PaymentLog.findByPk(logId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      if (!paymentLog) {
        throw new Error('Payment log not found');
      }

      return paymentLog;
    } catch (error) {
      console.error('Error fetching payment log:', error);
      throw new Error('Failed to fetch payment log');
    }
  }

  static async getUserPaymentLogs(userId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows: paymentLogs } = await PaymentLog.findAndCountAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      return {
        paymentLogs,
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching user payment logs:', error);
      throw new Error('Failed to fetch user payment logs');
    }
  }

  static async getFailedPayments(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows: paymentLogs } = await PaymentLog.findAndCountAll({
        where: { status: 'failed' },
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });

      return {
        paymentLogs,
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching failed payments:', error);
      throw new Error('Failed to fetch failed payments');
    }
  }

  static async updateStatus(logId, status, resolvedBy = null, notes = null) {
    try {
      const paymentLog = await PaymentLog.findByPk(logId);

      if (!paymentLog) {
        throw new Error('Payment log not found');
      }

      const updateData = {
        status,
        ...(status === 'resolved' && {
          resolvedAt: new Date(),
          resolvedBy,
        }),
        ...(notes && { notes }),
      };

      await paymentLog.update(updateData);
      return paymentLog;
    } catch (error) {
      console.error('Error updating payment log status:', error);
      throw new Error('Failed to update payment log status');
    }
  }
}
