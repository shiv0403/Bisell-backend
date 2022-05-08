const adController = require("./controller");

module.exports = function (router) {
  router.post("/ad-post", adController.postAd);
  router.get("/ad-image", adController.adImage);
  router.get("/ads-get", adController.getAds);
  router.get("/ad-get/:adId", adController.getAd);
};
