const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, characterController.getAllByUser);
router.post('/', auth, characterController.create);
router.get('/:id', auth, characterController.getOne);
router.put('/:id', auth, characterController.update);
router.delete('/:id', auth, characterController.remove);

module.exports = router;
