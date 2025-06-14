const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Реєстрація
router.post("/register", authController.register);

// Логін
router.post("/login", authController.login);

// Отримати дані поточного користувача
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// Зміна пароля (авторизований маршрут)
router.post("/change-password", authMiddleware, authController.changePassword);

module.exports = router;
