const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/db-connection");

module.exports = function (app) {
  app.use(express.json());

  app.use(
    cors({
      origin: "https://main.d2alebxh4xewmr.amplifyapp.com",
      credentials: true,
    })
  );

  dbConnection();
};

// methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//       allowedHeaders: ["Authorization", "Content-Type"],
