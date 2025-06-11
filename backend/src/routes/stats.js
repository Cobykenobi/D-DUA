const express = require("express");
const router = express.Router();
const { getRaceStats } = require("../controllers/statsController");

router.get("/races", getRaceStats);

module.exports = router;