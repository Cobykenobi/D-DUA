const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/start", sessionController.start);
router.post("/end", sessionController.end);
router.get("/log", sessionController.log);

module.exports = router;