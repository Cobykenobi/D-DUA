const Characteristic = require('../models/Characteristic');

exports.getAll = async (req, res) => {
  try {
    const characteristics = await Characteristic.find();
    res.json(characteristics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const characteristic = new Characteristic({ name, description });
    await characteristic.save();
    res.status(201).json(characteristic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const characteristic = await Characteristic.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description } },
      { new: true }
    );
    if (!characteristic) return res.status(404).json({ message: 'Not found' });
    res.json(characteristic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Characteristic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Characteristic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
