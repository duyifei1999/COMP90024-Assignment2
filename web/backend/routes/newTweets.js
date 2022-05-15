const express = require("express");
const router = express.Router();
const controller = require("../controllers/newTweets");

router.get("/housing", (req, res) => controller.getHousing(req, res));
router.get("/language", (req, res) => controller.getLanguage(req, res));

module.exports = router;
