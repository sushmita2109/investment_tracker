import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Investors from "./Investors.js";

const Payout = sequelize.define(
  "Payout",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    investorid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Investors,
        key: "userid",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    holderName: {
      type: DataTypes.STRING,
    },

    bankName: {
      type: DataTypes.STRING,
    },

    accountNumber: {
      type: DataTypes.STRING,
    },

    ifscCode: {
      type: DataTypes.STRING,
    },

    accountType: {
      type: DataTypes.ENUM("savings", "current"),
    },
    amount: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "payout",
    timestamps: true,
  }
);

export default Payout;
