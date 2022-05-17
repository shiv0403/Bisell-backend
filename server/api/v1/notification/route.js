const notificationController = require("./controller.js");

module.exports = function (router) {
  router.get(
    "/get-notifications/:userId",
    notificationController.getNotifications
  );
};
