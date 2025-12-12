import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelizeTest = new Sequelize(
  process.env.TEST_DB_NAME,
  process.env.TEST_DB_USER,
  process.env.TEST_DB_PASS,
  {
    host: process.env.TEST_DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelizeTest;
