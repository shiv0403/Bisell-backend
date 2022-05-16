const { Op, Sequelize } = require("sequelize");
const db = require("../../../config/sequelize");
const { createNotification } = require("../../../helper/notification");
const { generateUploadURL } = require("../../../helper/s3");

exports.adImage = async function (req, res) {
  const uploadUrl = await generateUploadURL();
  res.status(200).send({ uploadUrl });
};

exports.postAd = async function (req, res) {
  const { title, desc, quote, userId, categoryIds, images } = req.body;

  try {
    const ad = await db.Ad.create({
      userId,
      title,
      description: desc,
      quote,
      categoryIds: JSON.stringify(categoryIds),
      images: JSON.stringify(images),
    });

    return res.status(201).send(ad);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

exports.getAds = async function (req, res) {
  const { search, minBudget, maxBudget, collegeIds, param, order } = req.query;

  let whereClause1 = {},
    whereClause2 = {};

  // search filter
  if (search) {
    whereClause1 = {
      ...whereClause1,
      [Op.or]: [
        { title: { [Op.substring]: search } },
        { description: { [Op.substring]: search } },
      ],
    };
  }

  // budget filter
  if (minBudget && maxBudget) {
    whereClause1 = {
      ...whereClause1,
      quote: {
        [Op.between]: [minBudget, maxBudget],
      },
    };
  } else if (minBudget) {
    whereClause1 = {
      ...whereClause1,
      quote: { [Op.gte]: minBudget },
    };
  } else if (maxBudget) {
    whereClause1 = {
      ...whereClause1,
      quote: { [Op.lte]: maxBudget },
    };
  }

  // college filter
  if (collegeIds) {
    whereClause2 = {
      ...whereClause2,
      collegeId: collegeIds,
    };
  }

  // order
  let orderArr = ["createdAt", "DESC"];

  if (param === "date") {
    orderArr = ["createdAt", order];
  } else if (param === "price") {
    orderArr = ["quote", order];
  }

  try {
    let ads = await db.Ad.findAll({
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.College,
              as: "college",
            },
          ],
          as: "user",
          where: whereClause2,
        },
      ],
      where: whereClause1,
      order: [orderArr],
    });

    res.status(200).send(ads);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.getAd = async function (req, res) {
  const { adId } = req.params;

  try {
    const adData = await db.Ad.findOne({
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.College,
              as: "college",
            },
          ],
          as: "user",
        },
      ],
      where: {
        id: adId,
      },
    });
    res.status(200).send(adData);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.getUserAds = async function (req, res) {
  const { userId } = req.params;

  try {
    const userAds = await db.Ad.findAll({
      where: {
        userId,
      },
    });

    res.status(200).send(userAds);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.deleteAd = async function (req, res) {
  const { adId } = req.params;

  try {
    const ad = await db.Ad.destroy({
      where: {
        id: adId,
      },
    });

    res.status(200).send("Ad deleted");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.viewAd = async function (req, res) {
  let { adId } = req.body;

  try {
    const ad = await db.Ad.update(
      {
        views: Sequelize.literal("views + 1"),
      },
      {
        where: {
          id: parseInt(adId),
        },
      }
    );

    res.status(200).send("Ad viewed");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.bookmarkAd = async function (req, res) {
  const { adId } = req.body;

  try {
    const ad = await db.Ad.update(
      {
        bookmarks: Sequelize.literal("bookmarks + 1"),
      },
      {
        where: {
          id: adId,
        },
      }
    );

    res.status(200).send("Ad bookmarked");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.requestDetails = async function (req, res) {
  let { buyerId, sellerId, type, status } = req.body;

  try {
    const adStatus = await db.AdStatus.findOne({
      where: {
        sellerId,
        buyerId,
      },
    });

    const userData = await db.User.findOne({
      where: {
        id: buyerId,
      },
    });

    if (adStatus) {
      const updatedAtStatus = await db.AdStatus.update(
        {
          status, //pending
        },
        {
          where: {
            sellerId,
            buyerId,
          },
        }
      );

      // create notification
      let content = `<b>${userData.name}</b> has requested you to show your details.`;
      let data = {
        buyerId,
        sellerId,
      };

      const notification = createNotification(
        sellerId,
        JSON.stringify(data),
        null,
        content,
        type
      );

      return res.status(200).send(updatedAtStatus);
    } else {
      const newAdStatus = await db.AdStatus.create({
        sellerId,
        buyerId,
        status, //pending
      });

      // create notification
      let content = `<b>${userData.name}</b> has requested you to show your details.`;
      let data = {
        buyerId,
        sellerId,
      };
      const notification = createNotification(
        sellerId,
        JSON.stringify(data),
        null,
        content,
        type
      );

      return res.status(200).send(newAdStatus);
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.requestStatus = async function (req, res) {
  let { sellerId, buyerId } = req.query;
  try {
    const adStatus = await db.AdStatus.findOne({
      where: {
        sellerId,
        buyerId,
      },
    });

    if (adStatus) {
      return res.status(200).send({ status: adStatus.status });
    } else {
      return res.status(200).send({ status: 0 });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.requestPermission = async function (req, res) {
  const { buyerId, sellerId, status } = req.body;

  try {
    const adStatus = await db.AdStatus.update(
      {
        status,
      },
      {
        where: {
          buyerId,
          sellerId,
        },
      }
    );

    const sellerDetails = await db.User.findOne({
      where: {
        id: sellerId,
      },
      attributes: ["name"],
    });

    // send notification to buyer
    let content = `<b>${sellerDetails.name}</b> has ${
      status === 0 ? "<b>declined</b>" : "<b>accepted</b>"
    } your request to see their details`;
    let type = "general";
    const notification = createNotification(buyerId, null, null, content, type);

    res.status(200).send(adStatus);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.removeBookmark = async function (req, res) {};
