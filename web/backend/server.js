const express = require("express");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
