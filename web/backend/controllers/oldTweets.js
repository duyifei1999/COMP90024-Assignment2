const db = require("nano")(
  process.env.CHOUCHDB_HOST || "http://admin:admin@localhost:5984"
);

const getHousing = async (req, res) => {
  try {
    const old_tweets = await db.use("old_tweets");
    const result = await old_tweets.view("data_processing", "housing", {
      group_level: 1,
      key: req.query.key,
    });
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getLanguage = async (req, res) => {
  try {
    const old_tweets = await db.use("old_tweets");
    const result = await old_tweets.view("data_processing", "language", {
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
