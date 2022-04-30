const db = require("../../../config/sequelize");

exports.addUser = function (req, res) {
  const { name, email, password } = req.body;

  db.User.create({
    name,
    email,
    password,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
