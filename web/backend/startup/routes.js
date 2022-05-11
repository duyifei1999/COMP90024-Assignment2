const express = require("express");

module.exports = function (app, db) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/test", async (req, res) => {
    const tweets = await db.use("tweets");
    const test = await tweets.get("695ded16c5d1d89fea30c2b914000927");
    res.send(test);
  });

  app.get("/", (req, res) => res.send("HOMEPAGE"));
  app.all("*", (req, res) => res.status(404).send("NOT FOUND"));
};
