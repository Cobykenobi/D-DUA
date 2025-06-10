const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const onlyMaster = (req, res, next) => {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
  return res.status(403).json({ message: 'Forbidden' });
};

router.get('/users', auth, onlyMaster, userController.getAll);

module.exports = router;
