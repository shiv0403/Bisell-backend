const logger = require("../../helper/logger");
const sequelize = require("../sequelize");

module.exports = function () {
  const connect = function () {
    sequelize.sequelize
      .authenticate()
      .then(() => {
        logger.info("Database connected successfully");
      })
      .catch((err) => {
        logger.error("Database connection failed", err);
      });
  };
  connect();
};
