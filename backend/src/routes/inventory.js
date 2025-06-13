const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/authMiddleware');

router.get('/:characterId', auth, inventoryController.getByCharacter);
router.put('/:characterId', auth, inventoryController.update);

module.exports = router;
