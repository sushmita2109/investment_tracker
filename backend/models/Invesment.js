import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Investors from "./Investors.js";
import Sequelize from "sequelize";
import Payout from "./Payout.js";

const Invesment = sequelize.define(
  "Invesment",
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
        model: Investors, // reference to Investors model
        key: "userid", // the field in Investors table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    invesmentType: {
      type: DataTypes.ENUM("cash", "pledge"),
    },
    targetAccountDetails: {
      type: DataTypes.ENUM("company", "own"),
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    invesmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    expectedReturnRate: {
      type: DataTypes.FLOAT,
    },
    maturityDate: {
      type: DataTypes.DATE,
      defaultValue: null,
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
    tableName: "invesment",
  }
);

Invesment.afterCreate(async (inv) => {
  if (inv.targetAccountDetails === "own") {
    const investor = await Investors.findOne({
      where: { userid: inv.investorid },
    });

    const interestAmount =
      Number(inv.amount) * (Number(inv.expectedReturnRate) / 100);

    await Payout.create({
      investorid: inv.investorid,
      investmentId: inv.id, // <-- Important
      holderName: investor.firstname + " " + investor.lastname,
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "savings",
      amount: interestAmount,
    });
  }
});

export default Invesment;
