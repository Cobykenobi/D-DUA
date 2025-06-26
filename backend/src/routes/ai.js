const express = require('express');
const router = express.Router();
const { generateCharacterImage } = require('../utils/ai');

router.post('/avatar', async (req, res) => {
  const { race = 'human', profession = 'warrior', gender = 'male' } = req.body;
  try {
    const url = await generateCharacterImage(race, profession, gender);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error' });
  }
});

module.exports = router;
