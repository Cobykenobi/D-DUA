const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /register – user creation
router.post('/register', authController.register);

// POST /login – authentication
router.post('/login', authController.login);

// GET /me – return current user via auth middleware
router.get('/me', authMiddleware, userController.me);

// Update user settings
router.put('/settings', authMiddleware, userController.updateSettings);

module.exports = router;
