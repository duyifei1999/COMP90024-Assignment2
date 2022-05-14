require("dotenv").config();
const db = require("nano")(
  process.env.CHOUCHDB_HOST || "http://admin:admin@localhost:5984"
);
const newTweetsDBName = process.env.NEW_TWEETS_DB_NAME || "tweets";

const getHousing = async (req, res) => {
  try {
    const tweets = await db.use(newTweetsDBName);
    const result = await tweets.view("data_processing", "housing", {
      group_level: req.query.group_level || 1,
    });
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getLanguage = async (req, res) => {
  try {
    const tweets = await db.use(newTweetsDBName);
    const result = await tweets.view("data_processing", "language", {
      group_level: req.query.group_level || 1,
    });
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getHousing,
  getLanguage,
};
