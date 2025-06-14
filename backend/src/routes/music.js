const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const auth = require('../middleware/authMiddleware');

const onlyMaster = require('../middleware/onlyMaster');

router.get('/', auth, musicController.getAll);
router.post('/', auth, onlyMaster, musicController.create);
router.delete('/:id', auth, onlyMaster, musicController.remove);

module.exports = router;
