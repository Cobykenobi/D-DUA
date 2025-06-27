const Race = require('../models/Race');
const slug = require('../utils/slugify');

exports.getAll = async (req, res) => {
  try {
    const races = await Race.find();
    res.json(races);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    let { name, code, description, modifiers } = req.body;
    code = code || slug(name);

    const existing = await Race.findOne({
      $or: [{ name }, { code }]
    });
    if (existing) {
      return res.status(400).json({ message: 'Race already exists' });
    }

    const race = new Race({ name, code, description, modifiers });
    await race.save();
    res.status(201).json(race);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    let { name, code, description, modifiers } = req.body;
    code = code || slug(name);

    const duplicate = await Race.findOne({
      $or: [{ name }, { code }],
      _id: { $ne: req.params.id }
    });
    if (duplicate) {
      return res.status(400).json({ message: 'Race already exists' });
    }

    const race = await Race.findByIdAndUpdate(
      req.params.id,
      { $set: { name, code, description, modifiers } },
      { new: true }
    );
    if (!race) return res.status(404).json({ message: 'Not found' });
    res.json(race);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Race.findByIdAndDelete(req.params.id);
    res.json({ message: 'Race deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
