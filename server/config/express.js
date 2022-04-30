const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/db-connection");

module.exports = function (app) {
  app.use(express.json());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    })
  );

  dbConnection();
};
