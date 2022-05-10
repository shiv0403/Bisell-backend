const { Op, Sequelize } = require("sequelize");
const db = require("../../../config/sequelize");
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

exports.removeBookmark = async function (req, res) {};
