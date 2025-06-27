const Profession = require('../models/Profession');
const slug = require('../utils/slugify');

exports.getAll = async (req, res) => {
  try {
    const professions = await Profession.find();
    res.json(professions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    let { name, code, description, modifiers } = req.body;
    code = code || slug(name);

    const existing = await Profession.findOne({
      $or: [{ name }, { code }]
    });
    if (existing) {
      return res.status(400).json({ message: 'Profession already exists' });
    }

    const profession = new Profession({ name, code, description, modifiers });
    await profession.save();
    res.status(201).json(profession);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    let { name, code, description, modifiers } = req.body;
    code = code || slug(name);

    const duplicate = await Profession.findOne({
      $or: [{ name }, { code }],
      _id: { $ne: req.params.id }
    });
    if (duplicate) {
      return res.status(400).json({ message: 'Profession already exists' });
    }

    const profession = await Profession.findByIdAndUpdate(
      req.params.id,
      { $set: { name, code, description, modifiers } },
      { new: true }
    );
    if (!profession) return res.status(404).json({ message: 'Not found' });
    res.json(profession);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Profession.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profession deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
