const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Простий upload на сервер (storage можна змінити на cloud, якщо треба)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/maps/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const onlyMaster = require('../middleware/onlyMaster');

router.get('/', auth, mapController.getAll);
router.post('/', auth, onlyMaster, upload.single('image'), mapController.create);
router.delete('/:id', auth, onlyMaster, mapController.remove);

module.exports = router;
