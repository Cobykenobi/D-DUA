const Race = require('../models/Race');

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
    const { name, code, description } = req.body;
    const race = new Race({ name, code, description });
    await race.save();
    res.status(201).json(race);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const race = await Race.findByIdAndUpdate(
      req.params.id,
      { $set: { name, code, description } },
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
