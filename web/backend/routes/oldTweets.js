const express = require("express");
const router = express.Router();
const controller = require("../controllers/oldTweets");

router.get("/housing", (req, res) => controller.getHousing(req, res));
router.get("/language", (req, res) => controller.getLanguage(req, res));
router.get("/test", (req, res) => controller.getTesting(req, res));

module.exports = router;
