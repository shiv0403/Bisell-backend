const db = require("../../../config/sequelize");
const { hashPassword, comparePasswords } = require("../../../helper/utils");
const jwt = require("jsonwebtoken");
const config = require("../../../config/env/development.json");
const messages = require("./messages.json");

exports.addUser = async function (req, res) {
  const {
    name,
    email,
    password,
    age,
    about,
    phone,
    enroll,
    collegeId,
    address,
  } = req.body;

  const hashPass = hashPassword(password);

  try {
    const user = await db.User.create({
      name,
      email,
      password: hashPass,
      age,
      about,
      phone,
      enroll,
      collegeId,
      address,
    });

    const token = jwt.sign({ userId: user.id }, config.jwt.JWT_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: config.jwt.maxAge,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ err: messages.USER_NOT_CREATED });
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  const errors = { email: "", password: "" };

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    // user not registered
    if (user === null) {
      errors.email = messages.USER_NOT_REGISTERED;
    }

    const isUser = comparePasswords(password, user.password);

    if (isUser) {
      const token = jwt.sign({ userId: user.id }, config.jwt.JWT_SECRET);
      res.cookie("jwt", token, { httpOnly: true, maxAge: config.jwt.maxAge });
      return res.status(201).send({ user: { email: user.email, id: user.id } });
    } else {
      errors.password = messages.PASSWORD_INCORRECT;
      throw new Error();
    }
  } catch (error) {
    return res.status(500).send({ err: errors });
  }
};

exports.getUser = async function (req, res) {
  const { userId } = req.params;
  try {
    const userData = await db.User.findOne({
      include: [
        {
          model: db.College,
          attributes: ["id", "college"],
          as: "college",
        },
      ],
      where: {
        id: userId,
      },
    });

    const colleges = await db.College.findAll({
      attributes: ["id", "college"],
    });

    return res.status(200).send({ user: userData, colleges });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.updateUser = async function (req, res) {
  const { userId, name, email, image, about, phone, collegeId } = req.body;

  try {
    const updatedUser = await db.User.update(
      {
        name,
        email,
        image,
        about,
        phone,
        collegeId,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return res.status(200).send({ msg: messages.USER_UPDATED });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
