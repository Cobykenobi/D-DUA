const Music = require('../models/Music');

exports.getAll = async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, url } = req.body;
    const music = new Music({
      title,
      url,
      uploadedBy: req.user.id
    });
    await music.save();
    res.status(201).json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.json({ message: 'Music deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
