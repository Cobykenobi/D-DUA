const Character = require('../models/Character');
const Race = require('../models/Race');
const Profession = require('../models/Profession');
const Characteristic = require('../models/Characteristic');

const inventoryPool = [
  'Sword',
  'Bow',
  'Dagger',
  'Staff',
  'Shield',
  'Potion',
  'Axe',
  'Spear',
  'Mace',
  'Helmet',
  'Armor',
  'Lantern',
  'Rope',
  'Lockpick',
  'Food Rations'
];
const hpRanges = {
  Warrior: { min: 16, max: 20 },
  Wizard: { min: 6, max: 10 },
  Rogue: { min: 10, max: 14 },
};

const getRandomInventory = () => {
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 items
  const items = [];
  for (let i = 0; i < count; i++) {
    const name = inventoryPool[Math.floor(Math.random() * inventoryPool.length)];
    items.push({ item: name, amount: 1 });
  }
  return items;
};

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
      "/avatars/1.png"
    ];

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

    let characteristics = await Characteristic.find();
    if (!characteristics.length) {
      const fallback = await Characteristic.find().limit(1);
      characteristics = fallback;
    }

    const profName = profession[0]?.name;
    const hpChar = characteristics.find(c => c.name.toLowerCase() === 'hp');
    const hpRange = hpRanges[profName] || { min: 3, max: 18 };

    const stats = characteristics.map(char => {
      let value = Math.floor(Math.random() * 16) + 3; // 3-18
      if (hpChar && String(char._id) === String(hpChar._id)) {
        value = Math.floor(Math.random() * (hpRange.max - hpRange.min + 1)) + hpRange.min;
      }
      return { characteristic: char._id, value };
    });

    // Логіка вибору аватара
    const avatar = (image && image.trim())
      ? image
      : defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const inventory = getRandomInventory();

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
