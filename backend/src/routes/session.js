const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middlewares/authMiddleware');

const onlyMaster = (req, res, next) => {
  if (req.user && (req.user.role === 'master' || req.user.role === 'admin')) return next();
  return res.status(403).json({ message: 'Forbidden' });
};

router.get('/', auth, sessionController.getAll);
router.post('/', auth, onlyMaster, sessionController.create);
router.get('/:id', auth, sessionController.getOne);
router.put('/:id', auth, onlyMaster, sessionController.update);
router.delete('/:id', auth, onlyMaster, sessionController.remove);

module.exports = router;
