const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');
const auth = require('../middlewares/authMiddleware');

// Тільки для майстра або адміна
const onlyMaster = require('../middlewares/onlyMaster');

router.get('/', auth, raceController.getAll);
router.post('/', auth, onlyMaster, raceController.create);
router.put('/:id', auth, onlyMaster, raceController.update);
router.delete('/:id', auth, onlyMaster, raceController.remove);

module.exports = router;
