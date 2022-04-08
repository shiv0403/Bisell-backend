const fs = require("fs");
const { Sequelize } = require("sequelize");
const config = require("../config/env/development.json");

let db = {};

let sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
  }
);

fs.readdirSync(`${__dirname}/../api`).forEach((version) => {
  fs.readdirSync(`${__dirname}/../api/${version}`).forEach((folder) => {
    fs.readdirSync(`${__dirname}/../api/${version}/${folder}`).forEach(
      (file) => {
        if (file.indexOf("model") !== -1) {
          let model = require(`${__dirname}/../api/${version}/${folder}/model`)(
            sequelize,
            Sequelize.DataTypes
          );
          db[model.name] = model;
        }
      }
    );
  });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
