module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "users",
      freezeTableName: true,
    }
  );

  return User;
};
