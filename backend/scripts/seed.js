require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Characteristic = require('../src/models/Characteristic');
const User = require('../src/models/User');
const Item = require('../src/models/Item');
const StartingSet = require('../src/models/StartingSet');
const bcrypt = require('bcrypt');

const slug = str => str.toLowerCase().replace(/\s+/g, '_');

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
    { code: 'human', name: 'Людина' },
    { code: 'elf', name: 'Ельф' },
    { code: 'orc', name: 'Орк' },
    { code: 'gnome', name: 'Гном' },
    { code: 'dwarf', name: 'Дварф' },
    { code: 'halfling', name: 'Напіврослик' },
    { code: 'demon', name: 'Демон' },
    { code: 'beastkin', name: 'Звіролюд' },
    { code: 'angel', name: 'Ангел' },
    { code: 'lizardman', name: 'Ящіролюд' }
  ];
  const professions = [
    { code: 'warrior', name: 'Воїн' },
    { code: 'mage', name: 'Маг' },
    { code: 'rogue', name: 'Шахрай' },
    { code: 'healer', name: 'Цілитель' },
    { code: 'ranger', name: 'Рейнджер' },
    { code: 'bard', name: 'Бард' },
    { code: 'paladin', name: 'Паладин' }
  ];
  const characteristics = [
    'STR',
    'DEX',
    'INT',
    'CON',
    'CHA'
  ];

  const classInventory = {
    warrior: {
      weapon: [
        { item: 'Меч', bonus: { STR: 2 } },
        { item: 'Сокира', bonus: { STR: 2 } }
      ],
      armor: [
        { item: 'Щит', bonus: { CON: 1 } },
        { item: 'Шкіряна броня', bonus: { DEX: 1 } }
      ],
      misc: [
        { item: 'Зілля здоров’я' }
      ]
    },
    mage: {
      weapon: [
        { item: 'Магічний посох', bonus: { INT: 2 } },
        { item: 'Чарівна паличка', bonus: { INT: 1 } }
      ],
      armor: [
        { item: 'Обруч мудрості', bonus: { INT: 1 } },
        { item: 'Тканинна мантія', bonus: { CON: 1 } }
      ],
      misc: [
        { item: 'Мана-зілля' },
        { item: 'Книга заклять' }
      ]
    },
    rogue: {
      weapon: [
        { item: 'Кинджал', bonus: { DEX: 1 } },
        { item: 'Короткий меч', bonus: { DEX: 1 } }
      ],
      armor: [
        { item: 'Плащ тіні', bonus: { DEX: 1 } },
        { item: 'Легка броня', bonus: { DEX: 1 } }
      ],
      misc: [
        { item: 'Відмички' }
      ]
    },
    healer: {
      weapon: [
        { item: 'Жезл лікування', bonus: { CHA: 1 } },
        { item: 'Священний посох', bonus: { CHA: 1 } }
      ],
      armor: [
        { item: 'Легка ряса', bonus: { CON: 1 } },
        { item: 'Травник' }
      ],
      misc: [
        { item: 'Зілля лікування' }
      ]
    },
    ranger: {
      weapon: [
        { item: 'Лук', bonus: { DEX: 1 } },
        { item: 'Арбалет', bonus: { DEX: 1 } }
      ],
      armor: [
        { item: 'Шкіряна броня', bonus: { DEX: 1 } },
        { item: 'Ніж для виживання' }
      ],
      misc: [
        { item: 'Колчан стріл' }
      ]
    },
    bard: {
      weapon: [
        { item: 'Лютня', bonus: { CHA: 1 } },
        { item: 'Легкий меч', bonus: { DEX: 1 } }
      ],
      armor: [
        { item: 'Короткий лук', bonus: { DEX: 1 } },
        { item: 'Пісенник' }
      ],
      misc: []
    },
    paladin: {
      weapon: [
        { item: 'Молот', bonus: { STR: 1 } },
        { item: 'Святий меч', bonus: { STR: 2 } }
      ],
      armor: [
        { item: 'Латна броня', bonus: { CON: 2 } },
        { item: 'Святий щит', bonus: { CHA: 1 } }
      ],
      misc: [
        { item: 'Святий амулет' }
      ]
    }
  };

  const raceInventory = {
    elf: [{ item: 'Ельфійські стріли', bonus: { DEX: 1 } }],
    orc: [{ item: 'Кістяний талісман', bonus: { STR: 1 } }],
    human: [{ item: 'Монета удачі', bonus: { CHA: 1 } }],
    gnome: [{ item: 'Гвинтовий ключ' }],
    dwarf: [{ item: 'Похідна кружка', bonus: { CON: 1 } }],
    halfling: [{ item: 'Трубка та тютюн', bonus: { CHA: 1 } }],
    demon: [{ item: 'Темний камінь', bonus: { INT: 1 } }],
    beastkin: [{ item: 'Кігтістий амулет', bonus: { DEX: 1 } }],
    angel: [{ item: 'Пір’я з крила', bonus: { CHA: 1 } }],
    lizardman: [{ item: 'Луска пращура', bonus: { CON: 1 } }]
  };

  if (await Race.countDocuments() === 0) {

    await Race.insertMany(races.map(name => ({ name, code: slug(name) })));
    console.log('Races seeded');
  }

  if (await Profession.countDocuments() === 0) {

    await Profession.insertMany(professions.map(name => ({ name, code: slug(name) })));
    console.log('Professions seeded');
  }

  if (await Characteristic.countDocuments() === 0) {
    await Characteristic.insertMany(characteristics.map(name => ({ name })));
    console.log('Characteristics seeded');
  }

  const addItem = (map, def, type) => {
    if (!map.has(def.item)) {
      map.set(def.item, { name: def.item, type, bonuses: def.bonus || {} });
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
    for (const [cls, groups] of Object.entries(classInventory)) {
      const arrays = Object.values(groups)
        .filter(a => a.length)
        .map(a => a.map(d => d.item));
      const combos = combine(arrays);
      for (const combo of combos) {
        sets.push({ classCode: cls.toLowerCase(), items: combo.map(name => itemsByName[name]) });
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

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
