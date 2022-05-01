const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return this.setDataValue(moment());
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return this.setDataValue(moment());
        },
      },
    },
    {
      tableName: "categories",
      freezeTableName: true,
    }
  );

  return Category;
};
