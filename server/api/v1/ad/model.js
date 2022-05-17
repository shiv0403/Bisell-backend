const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Ad = sequelize.define(
    "Ad",
    {
      userId: DataTypes.INTEGER,
      categoryIds: DataTypes.STRING,
      images: DataTypes.STRING,
      views: DataTypes.INTEGER,
      bookmarks: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      quote: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        set() {
          return this.setDataValue(moment());
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        set() {
          return this.setDataValue(moment());
        },
      },
    },
    {
      tableName: "ads",
      freezeTableName: true,
    }
  );

  Ad.associate = function (models) {
    Ad.hasOne(models.User, {
      foreignKey: "id",
      sourceKey: "userId",
      as: "user",
    });

    Ad.hasOne(models.Bookmark, {
      foreignKey: "adId",
      sourceKey: "id",
      as: "bookmark",
    });
  };

  return Ad;
};
