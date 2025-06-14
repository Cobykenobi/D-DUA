const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const auth = require('../middlewares/authMiddleware');

const onlyMaster = (req, res, next) => {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
  return res.status(403).json({ message: 'Forbidden' });
};

router.get('/', auth, musicController.getAll);
router.post('/', auth, onlyMaster, musicController.create);
router.delete('/:id', auth, onlyMaster, musicController.remove);

module.exports = router;
