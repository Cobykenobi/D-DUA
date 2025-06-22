const Inventory = require('../models/Inventory');
const Character = require('../models/Character');
const slug = require('../utils/slugify');

exports.getByCharacter = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ character: req.params.characterId });
    if (!inventory) return res.json({ items: [] });
    const items = inventory.items.map(it => ({
      item: it.item,
      code: slug(it.item),
      amount: it.amount,
      description: it.description,
      bonus: it.bonus ? Object.fromEntries(it.bonus) : {}
    }));
    const base = inventory.toObject ? inventory.toObject() : inventory;
    res.json({ ...base, items });
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
    const mapped = inventory.items.map(it => ({
      item: it.item,
      code: slug(it.item),
      amount: it.amount,
      description: it.description,
      bonus: it.bonus ? Object.fromEntries(it.bonus) : {}
    }));
    const base = inventory.toObject ? inventory.toObject() : inventory;
    res.json({ ...base, items: mapped });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
