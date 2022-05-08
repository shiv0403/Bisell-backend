const db = require("../../../config/sequelize");
const message = require("./message.json");

exports.addCategory = async function (req, res) {
  let { name, userId } = req.body;

  try {
    const alreadyCategory = await db.Category.findOne({
      where: {
        name,
      },
    });

    if (alreadyCategory) {
      return res.status(400).send({ err: message.ALREADY_EXISTS });
    }

    const category = await db.Category.create({
      name,
      userId,
    });

    return res.status(201).send(category);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

exports.getCategories = async function (req, res) {
  try {
    await db.Category.findAll().then((result) => {
      return res.status(200).send(result);
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
