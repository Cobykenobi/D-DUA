const Character = require('../models/Character');
const Race = require('../models/Race');
const Profession = require('../models/Profession');


const generateStats = require('../utils/generateStats');
const generateInventory = require('../utils/generateInventory');

// Отримати всіх персонажів користувача
exports.getAllByUser = async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.id })
      .populate('race profession');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити персонажа
exports.create = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const uploaded = req.file ? `/uploads/avatars/${req.file.filename}` : null;


    // Обрати рандомно расу, професію і базові стати з колекції
  let race = await Race.aggregate([{ $sample: { size: 1 } }]);
  if (!race.length) {
    const fallback = await Race.find().limit(1);
    race = fallback;
  }

  let profession = await Profession.aggregate([{ $sample: { size: 1 } }]);
  if (!profession.length) {
    const fallback = await Profession.find().limit(1);
    profession = fallback;
  }

  if (!race.length || !profession.length) {
    return res.status(400).json({
      message: 'Missing races or professions to create character'
    });
  }



  const stats = generateStats(
    (race[0].code || race[0].name)?.toLowerCase(),
    (profession[0].code || profession[0].name)?.toLowerCase()
  );
 

    // Логіка вибору аватара
    const avatar = uploaded || (image && image.trim() ? image : '');


    const inventory = await generateInventory(race[0].code, profession[0].code);


    const newChar = new Character({
      user: req.user.id,
      name,
      description,
      image: avatar,
      race: race[0]?._id,
      profession: profession[0]?._id,
      stats,
      inventory
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
      .populate('race profession');
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
    const updateData = { name, description };
    if (req.file) {
      updateData.image = `/uploads/avatars/${req.file.filename}`;
    } else if (image) {
      updateData.image = image;
    }
    const char = await Character.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updateData },
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
