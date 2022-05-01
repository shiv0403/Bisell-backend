const bcrypt = require("bcrypt");
const config = require("../config/env/development.json");

exports.hashPassword = function (plainPassword) {
  const salt = bcrypt.genSaltSync(config.password.saltRounds);
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

exports.comparePasswords = function (plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
