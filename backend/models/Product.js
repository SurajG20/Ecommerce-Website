import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const validCategories = [
  'clothes',
  'women',
  'men',
  'shoes',
  'electronics',
  'others',
];

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      validate: {
        isValidCategory(value) {
          if (!Array.isArray(value)) {
            throw new Error('Category must be an array');
          }
          if (value.length === 0) {
            throw new Error('Category cannot be empty');
          }
          if (!value.every((cat) => validCategories.includes(cat))) {
            throw new Error('Invalid category value');
          }
        },
      },
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      validate: {
        isValidSize(value) {
          if (!Array.isArray(value)) {
            throw new Error('Size must be an array');
          }
          if (value.length === 0) {
            throw new Error('Size cannot be empty');
          }
        },
      },
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      validate: {
        isValidColor(value) {
          if (!Array.isArray(value)) {
            throw new Error('Color must be an array');
          }
          if (value.length === 0) {
            throw new Error('Color cannot be empty');
          }
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);

export default Product;
