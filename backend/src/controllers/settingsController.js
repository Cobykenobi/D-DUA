const User = require("../models/User");

const saveSettings = async (req, res) => {
  const { brightness, volume, language } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      settings: { brightness, volume, language },
    }, { new: true });
    res.json({ message: "Налаштування збережено", settings: user.settings });
  } catch (err) {
    res.status(500).json({ message: "Помилка збереження налаштувань" });
  }
};

module.exports = { saveSettings };