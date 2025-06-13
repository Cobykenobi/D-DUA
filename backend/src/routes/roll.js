const express = require('express');
const router = express.Router();
const rollController = require('../controllers/rollController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, rollController.create);
router.get('/history', auth, rollController.history);

module.exports = router;
