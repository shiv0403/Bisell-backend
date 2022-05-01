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
