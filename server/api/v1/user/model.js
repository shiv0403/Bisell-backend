const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      age: DataTypes.INTEGER,
      enroll: DataTypes.STRING,
      about: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      collegeId: DataTypes.INTEGER,
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

  User.associate = function (models) {
    User.hasOne(models.College, {
      sourceKey: "collegeId",
      foreignKey: "id",
      as: "college",
    });
  };

  return User;
};
