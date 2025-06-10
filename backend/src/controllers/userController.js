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
    const { musicVolume, brightness } = req.body;

    const update = {};
    if (musicVolume !== undefined) update['settings.musicVolume'] = musicVolume;
    if (brightness !== undefined) update['settings.brightness'] = brightness;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: update },
      { new: true }
    ).select('-password');

    res.json(user.settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
