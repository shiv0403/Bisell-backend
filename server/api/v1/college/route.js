const collegeController = require("./controller");

module.exports = function (router) {
  router.post("/college", collegeController.addCollege);
  router.get("/colleges", collegeController.getColleges);
};
