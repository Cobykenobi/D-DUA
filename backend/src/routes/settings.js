const express = require("express");
const router = express.Router();
const { saveSettings } = require("../controllers/settingsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, saveSettings);

module.exports = router;
