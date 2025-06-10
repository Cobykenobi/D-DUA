const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.me);
router.put('/settings', auth, userController.updateSettings);

module.exports = router;
