const Appearance = require('../models/Appearance');

async function getAppearance(req, res) {
  try {
    let appearance = await Appearance.findOne();
    if (!appearance) {
      appearance = await Appearance.create({});
    }
    res.json(appearance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateAppearance(req, res) {
  try {
    let appearance = await Appearance.findOne();
    if (!appearance) {
      appearance = new Appearance();
    }
    if (req.body.theme) {
      appearance.theme = req.body.theme;
    }
    if (req.file) {
      appearance.background = `/uploads/backgrounds/${req.file.filename}`;
    } else if (req.body.background) {
      appearance.background = req.body.background;
    }
    await appearance.save();
    res.json(appearance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAppearance, updateAppearance };
