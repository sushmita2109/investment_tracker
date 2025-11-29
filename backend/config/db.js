import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sys", "root", "sushmita", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
