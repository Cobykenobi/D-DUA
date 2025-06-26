const express = require('express');
const router = express.Router();
const {
  generateCharacterImage,
  generateCharacterDescription,
} = require('../utils/ai');

router.post('/avatar', async (req, res) => {
  const { description } = req.body;
  try {
    const url = await generateCharacterImage(description || 'fantasy character');
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error' });
  }
});

router.post('/description', async (req, res) => {
  try {
    const desc = await generateCharacterDescription(req.body || {});
    res.json({ description: desc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error' });
  }
});

module.exports = router;
