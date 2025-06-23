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
  const professions = [
    { code: 'warrior', name: 'Воїн', modifiers: { health: 0, defense: 1, strength: 2, intellect: 0, agility: 0, charisma: 0, mp: 0 } },
    { code: 'wizard', name: 'Маг', modifiers: { health: 0, defense: 0, strength: 0, intellect: 2, agility: 0, charisma: 0, mp: 1 } },
    { code: 'assassin', name: 'Асасін', modifiers: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 1, charisma: 0, mp: 0 } },
    { code: 'paladin', name: 'Паладин', modifiers: { health: 1, defense: 0, strength: 1, intellect: 0, agility: 0, charisma: 1, mp: 0 } },
    { code: 'bard', name: 'Бард', modifiers: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 1, mp: 0 } }
  ];
  const characteristics = [
    'health',
    'defense',
    'strength',
    'intellect',
    'agility',
    'charisma',
    'mp'
  ];

  const classInventory = {
    warrior: {
      weapon: [
        { item: 'Меч', bonus: { strength: 2 } },
        { item: 'Сокира', bonus: { strength: 2 } }
      ],
      armor: [
        { item: 'Щит', bonus: { defense: 1 } },
        { item: 'Шкіряна броня', bonus: { agility: 1 } }
      ],
      misc: [
        { item: 'Зілля здоров’я' }
      ]
    },
    wizard: {
      weapon: [
        { item: 'Магічний посох', bonus: { intellect: 2 } },
        { item: 'Чарівна паличка', bonus: { intellect: 1 } }
      ],
      armor: [
        { item: 'Обруч мудрості', bonus: { intellect: 1 } },
        { item: 'Тканинна мантія', bonus: { health: 1 } }
      ],
      misc: [
        { item: 'Мана-зілля' },
        { item: 'Книга заклять' }
      ]
    },
    assassin: {
      weapon: [
        { item: 'Лук', bonus: { agility: 1 } },
        { item: 'Арбалет', bonus: { agility: 1 } }
      ],
      armor: [
        { item: 'Шкіряна броня', bonus: { agility: 1 } },
        { item: 'Ніж для виживання' }
      ],
      misc: [
        { item: 'Колчан стріл' }
      ]
    },
    bard: {
      weapon: [
        { item: 'Лютня', bonus: { charisma: 1 } },
        { item: 'Легкий меч', bonus: { agility: 1 } }
      ],
      armor: [
        { item: 'Короткий лук', bonus: { agility: 1 } },
        { item: 'Пісенник' }
      ],
      misc: []
    },
    paladin: {
      weapon: [
        { item: 'Молот', bonus: { strength: 1 } },
        { item: 'Святий меч', bonus: { strength: 2 } }
      ],
      armor: [
        { item: 'Латна броня', bonus: { health: 2 } },
        { item: 'Святий щит', bonus: { charisma: 1 } }
      ],
      misc: [
        { item: 'Святий амулет' }
      ]
    }
  };

  const raceInventory = {
    human: [{ item: 'Монета удачі', bonus: { charisma: 1 } }],
    forest_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
    dark_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
    orc: [{ item: 'Кістяний талісман', bonus: { strength: 1 } }],
    gnome: [{ item: 'Гвинтовий ключ' }],
    dwarf: [{ item: 'Похідна кружка', bonus: { health: 1 } }]
  };

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
    if (!map.has(def.item)) {
      map.set(def.item, {
        name: def.item,
        code: slug(def.item),
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
    const inventorySets = {};
    for (const race of races) {
      inventorySets[race.code] = {};
      for (const [cls, groups] of Object.entries(classInventory)) {
        const arrays = Object.values(groups)
          .filter(a => a.length)
          .map(a => a.map(d => d.item));
        const combos = combine(arrays).slice(0, 3);
        inventorySets[race.code][cls] = combos;
      }
    }

    const sets = [];
    for (const [raceCode, classes] of Object.entries(inventorySets)) {
      for (const [cls, combos] of Object.entries(classes)) {
        for (const combo of combos) {
          sets.push({
            raceCode,
            classCode: cls.toLowerCase(),
            items: combo.map(name => itemsByName[name])
          });
        }
      }
    }
    if (sets.length) {
      await StartingSet.insertMany(sets);
      console.log('Starting sets seeded');
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
