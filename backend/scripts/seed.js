require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Characteristic = require('../src/models/Characteristic');
const User = require('../src/models/User');
const Item = require('../src/models/Item');
const StartingSet = require('../src/models/StartingSet');
const bcrypt = require('bcrypt');

const slug = require('../src/utils/slugify');
const { classInventory, raceInventory } = require('../src/data/staticInventoryTemplates');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment');
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGO_URI);


  // English versions kept for reference:
  // const races = [
  //   'Human',
  //   'Elf',
  //   'Dwarf',
  //   'Orc',
  //   'Halfling',
  //   'Gnome',
  //   'Tiefling',
  //   'Dragonborn',
  //   'Half-Elf',
  //   'Half-Orc'
  // ];
  // const professions = [
  //   'Warrior',
  //   'Wizard',
  //   'Rogue',
  //   'Cleric',
  //   'Ranger',
  //   'Paladin',
  //   'Bard',
  //   'Druid',
  //   'Monk',
  //   'Barbarian'
  // ];
  // const characteristics = ['HP', 'MP', 'Strength', 'Agility', 'Intellect'];

  const races = [
    { code: 'human', name: 'Людина', modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
    { code: 'forest_elf', name: 'Лісовий ельф', modifiers: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 2, charisma: 0, mp: 0 } },
    { code: 'dark_elf', name: 'Темний ельф', modifiers: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 1, charisma: 0, mp: 0 } },
    { code: 'gnome', name: 'Гном', modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
    { code: 'dwarf', name: 'Дварф', modifiers: { health: 1, defense: 1, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
    { code: 'orc', name: 'Орк', modifiers: { health: 1, defense: 0, strength: 2, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
  ];

  for (const code of Object.keys(raceInventory)) {
    if (!races.some(r => r.code === code)) {
      races.push({
        code,
        name: code,
        modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 }
      });
    }
  }
  const professions = [

    { code: 'warrior', name: 'Воїн', modifiers: { health: 0, defense: 1, strength: 2, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
    { code: 'wizard', name: 'Маг', modifiers: { health: 0, defense: 0, strength: 0, intellect: 2, agility: 0, charisma: 0, mp: 1 } },
    { code: 'assassin', name: 'Асасін', modifiers: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 1, charisma: 0, mp: 0 } },
    { code: 'paladin', name: 'Паладин', modifiers: { health: 1, defense: 0, strength: 1, intellect: 0, agility: 0, charisma: 1, mp: 0 } },
    { code: 'bard', name: 'Бард', modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 1, mp: 0 } },
    { code: 'archer', name: 'Лучник', modifiers: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 2, charisma: 0, mp: 0 } },
    { code: 'healer', name: 'Цілитель', modifiers: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 0, charisma: 1, mp: 1 } }

  ];

  for (const code of Object.keys(classInventory)) {
    if (!professions.some(p => p.code === code)) {
      professions.push({
        code,
        name: code,
        modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 }
      });
    }
  }
  const characteristics = [
    'health',
    'defense',
    'strength',
    'intellect',
    'agility',
    'charisma',
    'mp'
  ];


  if (await Race.countDocuments() === 0) {
    await Race.insertMany(races);
    console.log('Races seeded');
  }

  if (await Profession.countDocuments() === 0) {
    await Profession.insertMany(professions);
    console.log('Professions seeded');
  }

  if (await Characteristic.countDocuments() === 0) {
    await Characteristic.insertMany(characteristics.map(name => ({ name })));
    console.log('Characteristics seeded');
  }

  const addItem = (map, def, type) => {
    const key = slug(def.item);
    if (!map.has(key)) {
      map.set(key, {
        name: def.item,
        code: key,
        type,
        bonuses: def.bonus || {}
      });
    }
  };

  const itemMap = new Map();
  for (const groups of Object.values(classInventory)) {
    for (const [type, arr] of Object.entries(groups)) {
      arr.forEach(def => addItem(itemMap, def, type));
    }
  }
  for (const arr of Object.values(raceInventory)) {
    arr.forEach(def => addItem(itemMap, def, 'race'));
  }

  let itemsByName = {};
  if (await Item.countDocuments() === 0) {
    const inserted = await Item.insertMany(Array.from(itemMap.values()));
    inserted.forEach(i => { itemsByName[i.name] = i._id; });
    console.log('Items seeded');
  } else {
    const existing = await Item.find();
    existing.forEach(i => { itemsByName[i.name] = i._id; });
  }

  const combine = arrays => {
    if (!arrays.length) return [[]];
    const [first, ...rest] = arrays;
    const combos = combine(rest);
    const result = [];
    for (const val of first) {
      for (const c of combos) {
        result.push([val, ...c]);
      }
    }
    return result;
  };

  if (await StartingSet.countDocuments() === 0) {
    const sets = [];
    const skipped = [];

    for (const race of races) {
      for (const profession of professions) {
        const groups = classInventory[profession.code];
        if (!groups) {
          skipped.push(`${race.code}/${profession.code}`);
          continue;
        }

        const arrays = Object.values(groups)
          .filter(a => a.length)
          .map(a => a.map(d => d.item));

        if (!arrays.length) {
          skipped.push(`${race.code}/${profession.code}`);
          continue;
        }

        const combos = combine(arrays).slice(0, 3);
        if (combos.length === 0) {
          skipped.push(`${race.code}/${profession.code}`);
          continue;
        }

        for (const combo of combos) {
          sets.push({
            raceCode: race.code,
            classCode: profession.code,
            items: combo.map(name => itemsByName[name])
          });
        }
      }
    }

    if (sets.length) {
      await StartingSet.insertMany(sets);
      console.log('Starting sets seeded');
    }

    if (skipped.length) {
      for (const combo of skipped) {
        console.warn(`Skipped starting set for ${combo}`);
      }
    }
  }

  const adminLogin = 'root';
  if (await User.countDocuments({ login: adminLogin }) === 0) {
    const hash = await bcrypt.hash('kolokol911', 10);
    await User.create({
      login: adminLogin,
      username: 'Admin',
      password: hash,
      role: 'admin'
    });
    console.log('Admin user created');
  }

  await mongoose.disconnect();
}

module.exports = seed;

if (require.main === module) {
  seed().catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
}
