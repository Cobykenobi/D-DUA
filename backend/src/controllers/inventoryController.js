const Inventory = require('../models/Inventory');

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
    const inventory = await Inventory.findOneAndUpdate(
      { character: req.params.characterId },
      { $set: { items } },
      { new: true, upsert: true }
    );
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
