const Profession = require('../models/Profession');

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
    const { name, code, description } = req.body;
    const profession = new Profession({ name, code, description });
    await profession.save();
    res.status(201).json(profession);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const profession = await Profession.findByIdAndUpdate(
      req.params.id,
      { $set: { name, code, description } },
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
