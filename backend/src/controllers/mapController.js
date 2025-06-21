const Map = require('../models/Map');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/maps/${req.file.filename}` : '';
    const map = new Map({
      name,
      image,
      uploadedBy: req.user.id
    });
    await map.save();
    res.status(201).json(map);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Map.findByIdAndDelete(req.params.id);
    res.json({ message: 'Map deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
