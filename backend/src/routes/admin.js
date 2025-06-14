const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const onlyMaster = require('../middleware/onlyMaster');
const isAdmin = require('../middleware/isAdmin');

router.get('/users', auth, onlyMaster, adminController.getUsers);
router.put('/users/:id/role', auth, isAdmin, adminController.updateUserRole);

module.exports = router;
