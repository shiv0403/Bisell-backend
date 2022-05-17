const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: DataTypes.INTEGER,
      adId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
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
      tableName: "bookmarks",
      freezeTableName: true,
    }
  );

  Bookmark.associate = function (models) {
    Bookmark.hasOne(models.Ad, {
      foreignKey: "id",
      sourceKey: "adId",
      as: "ad",
    });
  };

  return Bookmark;
};
