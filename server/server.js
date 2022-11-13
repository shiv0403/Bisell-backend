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

server.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  logger.info(`Server is running on port ${port}`);
});
