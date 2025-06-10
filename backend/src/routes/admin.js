const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const onlyMaster = require('../middlewares/onlyMaster');

router.get('/users', auth, onlyMaster, adminController.getUsers);

module.exports = router;
