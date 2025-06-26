const express = require('express');
const router = express.Router();
const { generateCharacterImage } = require('../utils/ai');

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

module.exports = router;
