const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const onlyMaster = require('../middleware/onlyMaster');

router.get('/users', auth, onlyMaster, adminController.getUsers);

module.exports = router;
