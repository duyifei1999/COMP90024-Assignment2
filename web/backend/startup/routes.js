const express = require("express");
const oldTweets = require("../routes/oldTweets.js");
const newTweets = require("../routes/newTweets.js");

const oldTweetsDBName = process.env.OLD_TWEETS_DB_NAME || "old_tweets";
const newTweetsDBName = process.env.NEW_TWEETS_DB_NAME || "tweets";

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(`/api/${oldTweetsDBName}`, oldTweets);
  app.use(`/api/${newTweetsDBName}`, newTweets);

  app.get("/", (req, res) => res.send("HOMEPAGE"));
  app.all("*", (req, res) => res.status(404).send("NOT FOUND"));
};
