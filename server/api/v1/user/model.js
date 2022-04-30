const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment());
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment());
        },
      },
    },
    {
      tableName: "users",
      freezeTableName: true,
    }
  );

  return User;
};
