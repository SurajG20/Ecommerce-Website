import dotenv from "dotenv";

dotenv.config();

let env = process.env;

const Config = {
  SQL_DATABASE: env.DB_DATABASE,
  SQL_USERNAME: env.DB_USER,
  SQL_PASSWORD: env.DB_PASSWORD,
  SQL_HOST: env.DB_HOST,
  PORT: env.PORT,
};

export default Object.freeze(Config);
