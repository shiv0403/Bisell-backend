const categoryController = require("./controller");

module.exports = function (router) {
  router.post("/category", categoryController.addCategory);
};
