import sequelize from "./config/database.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully.");
  } catch (err) {
    console.error("Unable to connect to MySQL:", err);
  }
})();
