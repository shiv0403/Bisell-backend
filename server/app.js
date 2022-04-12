const fs = require("fs");

module.exports = function (app, router) {
  require("./config/express")(app);

  fs.readdirSync(`${__dirname}/api`).forEach((version) => {
    fs.readdirSync(`${__dirname}/api/${version}`).forEach((folder) => {
      fs.readdirSync(`${__dirname}/api/${version}/${folder}`).forEach(
        (file) => {
          if (file.indexOf("route") !== -1) {
            require(`${__dirname}/api/${version}/${folder}/route`)(router);
          }
        }
      );
    });
  });

  app.use("/v1", router);
};
