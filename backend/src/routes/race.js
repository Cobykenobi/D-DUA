const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');
const auth = require('../middleware/authMiddleware');

// Тільки для майстра або адміна
const onlyMaster = (req, res, next) => {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
  return res.status(403).json({ message: 'Forbidden' });
};

router.get('/', auth, raceController.getAll);
router.post('/', auth, onlyMaster, raceController.create);
router.put('/:id', auth, onlyMaster, raceController.update);
router.delete('/:id', auth, onlyMaster, raceController.remove);

module.exports = router;
