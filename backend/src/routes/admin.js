const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const auth = require('../middlewares/authMiddleware');
const onlyMaster = require('../middlewares/onlyMaster');
const isAdmin = require('../middlewares/isAdmin');


router.get('/users', auth, onlyMaster, adminController.getUsers);
router.put('/users/:id/role', auth, isAdmin, adminController.updateUserRole);

module.exports = router;
