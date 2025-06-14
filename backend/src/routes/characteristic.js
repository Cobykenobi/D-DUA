const express = require('express');
const router = express.Router();
const characteristicController = require('../controllers/characteristicController');
const auth = require('../middlewares/authMiddleware');

const onlyMaster = require('../middleware/onlyMaster');

router.get('/', auth, characteristicController.getAll);
router.post('/', auth, onlyMaster, characteristicController.create);
router.put('/:id', auth, onlyMaster, characteristicController.update);
router.delete('/:id', auth, onlyMaster, characteristicController.remove);

module.exports = router;
