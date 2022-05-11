const cors = require("cors");

const whitelist = "localhost:5000";

module.exports = function (app) {
  app.use(
    cors({
      origin: whitelist,
      // access-control-allow-credentials: true,
      credentials: true,
      optionSuccessStatus: 200,
    })
  );
};
