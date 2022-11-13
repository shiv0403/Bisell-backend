const user = require("./controller");

module.exports = function (router) {
  router.post("/add-user", user.addUser);
  router.get("/get-user/:userId", user.getUser);
  router.put("/update-user", user.updateUser);
  router.post("/login", user.login);
  router.get("/logout", user.logout);
};
