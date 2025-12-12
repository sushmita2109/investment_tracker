import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? process.env.TEST_DB_NAME : process.env.DATABASE_NAME,
  isTest ? process.env.TEST_DB_USER : process.env.DATABASE_USER,
  isTest ? process.env.TEST_DB_PASS : process.env.DATABASE_PASSWORD,
  {
    host: isTest ? process.env.TEST_DB_HOST : process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
