const sequelize = require("../sequelize");

module.exports = function () {
  const connect = function () {
    sequelize.sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log("Database connection failed", err);
      });
  };
  connect();
};
