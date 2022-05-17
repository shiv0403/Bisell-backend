const db = require("../config/sequelize");

exports.createNotification = async function (userId, data, url, content, type) {
  const notification = await db.Notification.create({
    userId,
    data,
    url,
    content,
    type,
  });

  return notification;
};
