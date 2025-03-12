import { Sequelize } from "sequelize";
import Config from "./config.js";

const sequelize = new Sequelize(
  Config.SQL_DATABASE,
  Config.SQL_USERNAME,
  Config.SQL_PASSWORD,
  {
    host: Config.SQL_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default sequelize;
