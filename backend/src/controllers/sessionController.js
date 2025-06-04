const Session = require('../models/Session');
const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    const query = req.user.role === 'master' ? { master: req.user.id } : { players: req.user.id };
    const sessions = await Session.find(query).populate('master players activeMap activeMusic');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, playerIds } = req.body;
    const session = new Session({
      name,
      master: req.user.id,
      players: playerIds
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('master players activeMap activeMusic');
    if (!session) return res.status(404).json({ message: 'Not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, playerIds, activeMap, activeMusic } = req.body;
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: { name, players: playerIds, activeMap, activeMusic } },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
