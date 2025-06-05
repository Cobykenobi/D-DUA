const Character = require('../models/Character');
const Race = require('../models/Race');
const Profession = require('../models/Profession');
const Characteristic = require('../models/Characteristic');

// Отримати всіх персонажів користувача
exports.getAllByUser = async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.id })
      .populate('race profession stats.characteristic');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити персонажа
exports.create = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Дефолтні аватари
    const defaultAvatars = [
      "/avatars/1.png",
      "/avatars/2.png",
      "/avatars/3.png",
      "/avatars/4.png"
    ];

    // Обрати рандомно расу, професію і базові стати з колекції
    const race = await Race.aggregate([{ $sample: { size: 1 } }]);
    const profession = await Profession.aggregate([{ $sample: { size: 1 } }]);
    const characteristics = await Characteristic.find();

    const stats = characteristics.map(char => ({
      characteristic: char._id,
      value: Math.floor(Math.random() * 16) + 3 // від 3 до 18
    }));

    // Логіка вибору аватара
    const avatar = (image && image.trim())
      ? image
      : defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newChar = new Character({
      user: req.user.id,
      name,
      description,
      image: avatar,
      race: race[0]?._id,
      profession: profession[0]?._id,
      stats
    });

    await newChar.save();
    res.status(201).json(newChar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Отримати одного персонажа
exports.getOne = async (req, res) => {
  try {
    const char = await Character.findOne({ _id: req.params.id, user: req.user.id })
      .populate('race profession stats.characteristic');
    if (!char) return res.status(404).json({ message: 'Not found' });
    res.json(char);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Оновити персонажа (імʼя, опис, фото)
exports.update = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const char = await Character.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { name, description, image } },
      { new: true }
    );
    if (!char) return res.status(404).json({ message: 'Not found' });
    res.json(char);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Видалити персонажа
exports.remove = async (req, res) => {
  try {
    await Character.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
