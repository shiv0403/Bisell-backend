const jwt = require("jsonwebtoken");
const config = require("../config/env/development.json");

exports.requireAuth = async function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.jwt.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

exports.checkUser = async function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.jwt.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
