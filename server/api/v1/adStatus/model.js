const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const AdStatus = sequelize.define(
    "AdStatus",
    {
      adId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment());
        },
      },
    },
    {
      tableName: "adStatus",
      freezeTableName: true,
    }
  );

  return AdStatus;
};
