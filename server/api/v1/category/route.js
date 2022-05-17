const categoryController = require("./controller");

module.exports = function (router) {
  router.post("/category", categoryController.addCategory);
  router.get("/categories", categoryController.getCategories);
};
