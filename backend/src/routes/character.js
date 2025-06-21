const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', auth, characterController.getAllByUser);
router.post('/', auth, upload.single('image'), characterController.create);
router.get('/:id', auth, characterController.getOne);
router.put('/:id', auth, upload.single('image'), characterController.update);
router.delete('/:id', auth, characterController.remove);

module.exports = router;
