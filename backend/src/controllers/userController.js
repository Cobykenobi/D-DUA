const User = require('../models/User');

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { volume, brightness } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { 'settings.volume': volume, 'settings.brightness': brightness } },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
