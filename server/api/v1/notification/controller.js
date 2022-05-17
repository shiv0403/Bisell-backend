const db = require("../../../config/sequelize");

exports.getNotifications = async function (req, res) {
  const { userId } = req.params;

  try {
    const notifications = await db.Notification.findAll({
      where: {
        userId,
      },
    });

    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};
