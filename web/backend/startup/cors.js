const cors = require("cors");

const whitelist = process.env.CORS_WHITELIST || "http://localhost:5000";

module.exports = function (app) {
  app.use(
    cors({
      origin: whitelist.split(" "),
      // access-control-allow-credentials: true,
      credentials: true,
      optionSuccessStatus: 200,
    })
  );
};
