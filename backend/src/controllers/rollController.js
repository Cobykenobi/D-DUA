const Roll = require('../models/Roll');

// Кидок кубика
exports.create = async (req, res) => {
  try {
    const { diceType, isPrivate, session } = req.body;
    // d20, d6, d8, d4 і т.д.
    const diceMatch = diceType.match(/^d(\d+)$/i);
    if (!diceMatch) return res.status(400).json({ message: 'Invalid dice type' });
    const max = parseInt(diceMatch[1], 10);
    const value = Math.floor(Math.random() * max) + 1;
    const roll = new Roll({
      roller: req.user.id,
      diceType,
      value,
      isPrivate: !!isPrivate,
      session
    });
    await roll.save();
    const result = {
      value: isPrivate ? null : value,
      roller: req.user.id,
      diceType,
      id: roll._id
    };
    const io = req.app.get('io');
    if (io && session) {
      io.to(session).emit('dice-roll', result);
    }
    // Якщо isPrivate — тільки майстер отримує результат
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Історія кидків (для поточної сесії)
exports.history = async (req, res) => {
  try {
    const { session } = req.query;
    const query = { session };
    // ГМ бачить всі, інші тільки публічні
    if (req.user.role !== 'gm') query.isPrivate = false;
    const rolls = await Roll.find(query).sort({ createdAt: -1 }).limit(50);
    res.json(rolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
