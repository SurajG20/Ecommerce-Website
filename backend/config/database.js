import { Sequelize } from 'sequelize';
import Config from './config.js';

const sequelize = new Sequelize(Config.SQL_DATABASE, Config.SQL_USERNAME, Config.SQL_PASSWORD, {
  host: Config.SQL_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
    ],
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Let the caller handle the error
  }
};

export default sequelize;
