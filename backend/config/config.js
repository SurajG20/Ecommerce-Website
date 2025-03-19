import dotenv from 'dotenv';

dotenv.config();

let env = process.env;

const Config = {
  SQL_DATABASE: env.DB_DATABASE,
  SQL_USERNAME: env.DB_USER,
  SQL_PASSWORD: env.DB_PASSWORD,
  SQL_HOST: env.DB_HOST,
  PORT: env.PORT,
  RATE_LIMIT: env.RATE_LIMIT,
  JWT_SECRET: env.JWT_SECRET,
  JWT_LIFETIME: env.JWT_LIFETIME,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL: env.FRONTEND_URL,
};

export default Object.freeze(Config);
