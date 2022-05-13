const express = require("express");
const oldTweets = require("../routes/oldTweets.js");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/oldTweets", oldTweets);

  app.get("/", (req, res) => res.send("HOMEPAGE"));
  app.all("*", (req, res) => res.status(404).send("NOT FOUND"));
};
