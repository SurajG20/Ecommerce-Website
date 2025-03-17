import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidItems(value) {
          if (!Array.isArray(value)) {
            throw new Error('Items must be an array');
          }
          value.forEach((item) => {
            if (!item.productId || !item.title || !item.price || !item.quantity) {
              throw new Error('Each item must have productId, title, price, and quantity');
            }
          });
        },
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'inr',
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isValidAddress(value) {
          if (
            value &&
            (!value.line1 || !value.line2 || !value.country || !value.city || !value.state || !value.postal_code)
          ) {
            throw new Error('Shipping address must include line1, line2, country, city, state, and postalCode');
          }
        },
      },
    },
    orderStatus: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['paymentStatus'],
      },
      {
        fields: ['orderStatus'],
      },
    ],
  },
);

export default Order;
