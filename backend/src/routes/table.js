const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const auth = require('../middlewares/authMiddleware');
const gm = require('../middlewares/onlyMaster');

// Create a new table (gm only)
router.post('/', auth, gm, async (req, res) => {
  try {
    const tableId = Math.random().toString(36).substring(2, 8);
    const table = new Table({ tableId, gm: req.user._id });
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get table by id
router.get('/:id', auth, async (req, res) => {
  try {
    const table = await Table.findOne({ tableId: req.params.id });
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update table (gm only)
router.put('/:id', auth, gm, async (req, res) => {
  try {
    const allowed = ['mapUrl', 'musicTrack', 'playerInfo', 'players', 'state'];
    const update = {};
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }
    const table = await Table.findOneAndUpdate(
      { tableId: req.params.id },
      update,
      { new: true }
    );
    if (!table) return res.status(404).json({ message: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List tables
router.get('/', auth, async (req, res) => {
  try {
    const tables = await Table.find({ gm: req.user._id });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
