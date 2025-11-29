const Sequelize = require("sequelize");

const sequelize = new Sequelize("sys", "root", "sushmita", {
  host: "localhost",
  dialect: "mysql",
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// test();

//1. Model
const Admins = sequelize.define(
  "admins",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
//2.Add new admin (insert)
const insertAdmin = async () => {
  try {
    await sequelize.query(
      "INSERT INTO admins (username, email, password) VALUES ('admin1', 'admin@gmail.com','123456')"
    );

    console.log("Admin inserted successfully");
  } catch (err) {
    console.error("Error inserting admin:", err);
  }
};

// insertAdmin();
//3. Fetch all admins (select)

const user = async () => {
  //   const [result] = await sequelize.query("SELECT * FROM Admins");
  const admins = await Admins.findAll();
  const result = admins.map((admin) => admin.toJSON());
  console.log(result);
};

// user();
