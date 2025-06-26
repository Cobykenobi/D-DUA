const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAppearance, updateAppearance } = require('../controllers/appearanceController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/backgrounds/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', getAppearance);
router.put('/', auth, isAdmin, upload.single('background'), updateAppearance);

module.exports = router;
