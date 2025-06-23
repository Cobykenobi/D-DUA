const Character = require('../models/Character');
const Race = require('../models/Race');
const Profession = require('../models/Profession');


const generateStats = require('../utils/generateStats');
const generateInventory = require('../utils/generateInventory');
const slug = require('../utils/slugify');

function mapInventory(inv) {
  return (inv || []).map(it => ({
    item: it.item,
    amount: it.amount,
    bonus: it.bonus ? Object.fromEntries(it.bonus) : {},
    code: slug(it.item)
  }));
}

// Отримати всіх персонажів користувача
exports.getAllByUser = async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.id })
      .populate('race', 'name code')
      .populate('profession', 'name code');
    const mapped = characters.map(ch => {
      const obj = ch.toObject ? ch.toObject() : ch;
      obj.inventory = mapInventory(obj.inventory);
      return obj;
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити персонажа
exports.create = async (req, res) => {
  try {

    let { name, description, image, gender, raceId, professionId } = req.body;


    if (!name || typeof name !== 'string' || !name.trim() || name.trim().length > 50) {
      return res.status(400).json({ message: 'Invalid name' });
    }

    if (description && (typeof description !== 'string' || description.length > 500)) {
      return res.status(400).json({ message: 'Invalid description' });
    }

    if (image && (typeof image !== 'string' || image.length > 500)) {
      return res.status(400).json({ message: 'Invalid image' });
    }

    name = name.trim();
    description = description ? description.trim() : '';
    image = image ? image.trim() : '';

    const uploaded = req.file ? `/uploads/avatars/${req.file.filename}` : null;


    // Обрати расу та професію (використати передані id або згенерувати випадково)
  let race;
  if (raceId) {
    const found = await Race.findById(raceId);
    race = found ? [found] : [];
  } else if (raceCode) {
    const found = await Race.findOne({ code: raceCode });
    race = found ? [found] : [];
  } else {
    race = await Race.aggregate([{ $sample: { size: 1 } }]);
    if (!race.length) {
      const fallback = await Race.find().limit(1);
      race = fallback;
    }
  }

  let profession;
  if (professionId) {
    const found = await Profession.findById(professionId);
    profession = found ? [found] : [];
  } else if (professionCode) {
    const found = await Profession.findOne({ code: professionCode });
    profession = found ? [found] : [];
  } else {
    profession = await Profession.aggregate([{ $sample: { size: 1 } }]);
    if (!profession.length) {
      const fallback = await Profession.find().limit(1);
      profession = fallback;
    }
  }

  if (!race.length || !profession.length) {
    return res.status(400).json({
      message: 'Missing races or professions to create character'
    });
  }



  const raceCodeRaw = (race[0].code || race[0].name).toLowerCase();
  const detectedGender = raceCodeRaw.endsWith('_female') ? 'female' : 'male';
  const finalGender = (gender && ['male', 'female'].includes(gender)) ? gender : detectedGender;
  const raceBase = raceCodeRaw.replace(/_(male|female)$/, '');
  const classCodeLower = (profession[0].code || profession[0].name).toLowerCase();

  const stats = generateStats(raceBase, classCodeLower, finalGender);


    // Логіка вибору аватара
    const avatar = uploaded || (image ? image : '');

    const inventory = await generateInventory(raceCodeRaw, classCodeLower);
    if (!inventory.length) {
      console.warn(`Empty inventory for race ${raceCodeRaw} class ${classCodeLower}`);
    }


  const newChar = new Character({
      user: req.user.id,
      name,
      description,
      image: avatar,
      gender: finalGender,
      race: race[0]?._id,
      profession: profession[0]?._id,
      stats,
      inventory
    });

    await newChar.save();

    const populated = await Character.findById(newChar._id)
      .populate('race', 'name code')
      .populate('profession', 'name code');
    const obj = populated.toObject ? populated.toObject() : populated;
    obj.inventory = mapInventory(obj.inventory);
    res.status(201).json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Отримати одного персонажа
exports.getOne = async (req, res) => {
  try {
    const char = await Character.findOne({ _id: req.params.id, user: req.user.id })
      .populate('race', 'name code')
      .populate('profession', 'name code');
    if (!char) return res.status(404).json({ message: 'Not found' });
    const obj = char.toObject ? char.toObject() : char;
    obj.inventory = mapInventory(obj.inventory);
    res.json(obj);
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

    const populated = await Character.findById(char._id)
      .populate('race', 'name code')
      .populate('profession', 'name code');
    const obj = populated.toObject ? populated.toObject() : populated;
    obj.inventory = mapInventory(obj.inventory);
    res.json(obj);
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
