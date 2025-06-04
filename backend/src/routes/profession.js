const express = require('express');
const router = express.Router();
const professionController = require('../controllers/professionController');
const auth = require('../middlewares/authMiddleware');

const onlyMaster = (req, res, next) => {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
  return res.status(403).json({ message: 'Forbidden' });
};

router.get('/', auth, professionController.getAll);
router.post('/', auth, onlyMaster, professionController.create);
router.put('/:id', auth, onlyMaster, professionController.update);
router.delete('/:id', auth, onlyMaster, professionController.remove);

module.exports = router;
