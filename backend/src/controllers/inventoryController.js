const Inventory = require('../models/Inventory');
const Character = require('../models/Character');

exports.getByCharacter = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ character: req.params.characterId });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { items } = req.body;
    const characterId = req.params.characterId;

    if (req.user.role !== 'admin' && req.user.role !== 'gm') {
      const char = await Character.findOne({ _id: characterId, user: req.user.id });
      if (!char) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    const inventory = await Inventory.findOneAndUpdate(
      { character: characterId },
      { $set: { items } },
      { new: true, upsert: true }
    );
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
