const user = require("./controller");

module.exports = function (router) {
  router.post("/add-user", user.addUser);
};
