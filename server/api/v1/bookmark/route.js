const bookmarkController = require("./controller");

module.exports = function (router) {
  router.put("/bookmark", bookmarkController.bookmark);
  router.get("/get-bookmarks/:userId", bookmarkController.getUserBookmarks);
};
