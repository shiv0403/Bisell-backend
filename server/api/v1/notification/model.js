const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Notification = sequelize.define(
    "Notification",
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      data: DataTypes.STRING,
      url: DataTypes.STRING,
      content: DataTypes.STRING,
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
      tableName: "notifications",
      freezeTableName: true,
    }
  );

  return Notification;
};
