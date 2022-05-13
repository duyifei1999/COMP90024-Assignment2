const db = require("nano")(
  process.env.CHOUCHDB_HOST || "http://admin:admin@localhost:5984"
);

const getHousing = async (req, res) => {
  res.send("Housing");
};

const getLanguage = async (req, res) => {
  res.send("Language");
};

const getTesting = async (req, res) => {
   const old_tweets = await db.use("old_tweets");
   const test = await old_tweets.get("007a9db5e190cc6d79fadb4f1b0008a1");
   res.send(test);
};

module.exports = {
  getHousing,
  getLanguage,
  getTesting,
};
