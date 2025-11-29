import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Sequelize from "sequelize";

const Investors = sequelize.define(
  "Investors",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    pan: {
      type: DataTypes.STRING,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    ifscCode: {
      type: DataTypes.STRING,
    },
    accountType: {
      type: DataTypes.ENUM("savings", "current"),
      defaultValue: "savings",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "investor", // use your exact table name
  }
);
Investors.beforeCreate((investor) => {
  const first2 = investor.firstname.slice(0, 4).toUpperCase();
  const last2 = investor.lastname.slice(0, 4).toUpperCase();

  investor.userid = first2 + last2;
});

export default Investors;
