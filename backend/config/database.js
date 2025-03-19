import { Sequelize } from 'sequelize';
import Config from './config.js';

const sequelize = new Sequelize(Config.SQL_DATABASE, Config.SQL_USERNAME, Config.SQL_PASSWORD, {
  host: Config.SQL_HOST,
  dialect: 'postgres',
  logging: false,
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
    throw error;
  }
};

export default sequelize;
