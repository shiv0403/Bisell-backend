require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();

const config = require("./config/env/development.json");
const logger = require("./helper/logger");

const { port } = config.express;
const server = http.createServer(app);

require(`${__dirname}/app`)(app, router);

server.listen(process.env.PORT || port, "localhost", () => {
  logger.info(`Server is running on port ${port}`);
});
