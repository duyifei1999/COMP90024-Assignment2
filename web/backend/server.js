const express = require("express");
const app = express();
const db = require("nano")(
  process.env.CHOUCHDB_HOST || "http://admin:admin@localhost:5984"
);

require("./startup/cors")(app);
require("./startup/routes")(app, db);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
