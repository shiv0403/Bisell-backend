const { Sequelize } = require("sequelize");
const db = require("../../../config/sequelize");

exports.bookmark = async function (req, res) {
  const { adId, userId, status } = req.body;

  try {
    let bookmark = await db.Bookmark.findOne({
      where: {
        adId,
        userId,
      },
    });

    if (bookmark) {
      bookmark = await db.Bookmark.update(
        {
          status,
        },
        {
          where: {
            id: bookmark.id,
          },
        }
      );
    } else {
      bookmark = await db.Bookmark.create({
        adId,
        userId,
        status,
      });
    }

    if (status === 1) {
      let ad = await db.Ad.update(
        {
          bookmarks: Sequelize.literal("bookmarks + 1"),
        },
        {
          where: {
            id: adId,
          },
        }
      );
    } else if (status === 0) {
      let ad = await db.Ad.update(
        {
          bookmarks: Sequelize.literal("bookmarks - 1"),
        },
        {
          where: {
            id: adId,
          },
        }
      );
    }

    return res.status(201).send({ bookmark: bookmark });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

exports.getUserBookmarks = async function (req, res) {
  const { userId } = req.params;

  try {
    const bookmarks = await db.Bookmark.findAll({
      include: [
        {
          model: db.Ad,
          as: "ad",
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
            {
              model: db.Bookmark,
              where: {
                userId,
              },
              as: "bookmark",
              required: false,
            },
          ],
        },
      ],
      where: {
        userId,
        status: 1,
      },
    });

    res.status(200).send(bookmarks);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};
