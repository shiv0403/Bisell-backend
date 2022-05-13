const adController = require("./controller");

module.exports = function (router) {
  router.post("/ad-post", adController.postAd);
  router.put("/ad-view", adController.viewAd);
  router.put("/ad-bookmark", adController.bookmarkAd);
  router.get("/ad-image", adController.adImage);
  router.get("/ads-get", adController.getAds);
  router.get("/ad-get/:adId", adController.getAd);
  router.get("/ads-get/:userId", adController.getUserAds);
  router.delete("/ad-delete/:adId", adController.deleteAd);
  router.put("/ad-request", adController.requestDetails);
  router.get("/ad-request-status", adController.requestStatus);
};
