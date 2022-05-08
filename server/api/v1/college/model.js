const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let College = sequelize.define(
    "College",
    {
      rank: DataTypes.INTEGER,
      college: DataTypes.STRING,
      city: DataTypes.STRING,
      aboutCollegeLink: DataTypes.STRING,
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
      tableName: "colleges",
      freezeTableName: true,
    }
  );

  return College;
};
