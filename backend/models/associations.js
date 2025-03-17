import Order from './Order.js';
import PaymentLog from './PaymentLog.js';
import User from './User.js';

const initModels = () => {
  User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders',
  });

  Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  User.hasMany(PaymentLog, {
    foreignKey: 'userId',
    as: 'paymentLogs',
  });

  PaymentLog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

export { initModels };
