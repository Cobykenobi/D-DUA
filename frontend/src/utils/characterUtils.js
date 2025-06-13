export const races = [
  'Human',
  'Elf',
  'Orc',
  'Gnome',
  'Dwarf',
  'Halfling',
  'Demon',
  'Beastkin',
  'Angel',
  'Lizardman'
];
export const classes = [
  'Warrior',
  'Mage',
  'Rogue',
  'Healer',
  'Ranger',
  'Bard',
  'Paladin'
];

const classInventory = {
  Warrior: {
    weapon: [
      { item: 'Меч', amount: 1, bonus: { STR: 2 } },
      { item: 'Сокира', amount: 1, bonus: { STR: 2 } },
    ],
    armor: [
      { item: 'Щит', amount: 1, bonus: { CON: 1 } },
      { item: 'Шкіряна броня', amount: 1, bonus: { DEX: 1 } },
    ],
    misc: [
      { item: 'Зілля здоров’я', amount: 1 },
    ],
  },
  Mage: {
    weapon: [
      { item: 'Магічний посох', amount: 1, bonus: { INT: 2 } },
      { item: 'Чарівна паличка', amount: 1, bonus: { INT: 1 } },
    ],
    armor: [
      { item: 'Обруч мудрості', amount: 1, bonus: { INT: 1 } },
      { item: 'Тканинна мантія', amount: 1, bonus: { CON: 1 } },
    ],
    misc: [
      { item: 'Мана-зілля', amount: 1 },
      { item: 'Книга заклять', amount: 1 },
    ],
  },
  Rogue: {
    weapon: [
      { item: 'Кинджал', amount: 1, bonus: { DEX: 1 } },
      { item: 'Короткий меч', amount: 1, bonus: { DEX: 1 } },
    ],
    armor: [
      { item: 'Плащ тіні', amount: 1, bonus: { DEX: 1 } },
      { item: 'Легка броня', amount: 1, bonus: { DEX: 1 } },
    ],
    misc: [
      { item: 'Відмички', amount: 1 },
    ],
  },
  Healer: {
    weapon: [
      { item: 'Жезл лікування', amount: 1, bonus: { CHA: 1 } },
      { item: 'Священний посох', amount: 1, bonus: { CHA: 1 } },
    ],
    armor: [
      { item: 'Легка ряса', amount: 1, bonus: { CON: 1 } },
      { item: 'Травник', amount: 1 },
    ],
    misc: [
      { item: 'Зілля лікування', amount: 1 },
    ],
  },
  Ranger: {
    weapon: [
      { item: 'Лук', amount: 1, bonus: { DEX: 1 } },
      { item: 'Арбалет', amount: 1, bonus: { DEX: 1 } },
    ],
    armor: [
      { item: 'Шкіряна броня', amount: 1, bonus: { DEX: 1 } },
      { item: 'Ніж для виживання', amount: 1 },
    ],
    misc: [
      { item: 'Колчан стріл', amount: 1 },
    ],
  },
  Bard: {
    weapon: [
      { item: 'Лютня', amount: 1, bonus: { CHA: 1 } },
      { item: 'Легкий меч', amount: 1, bonus: { DEX: 1 } },
    ],
    armor: [
      { item: 'Короткий лук', amount: 1, bonus: { DEX: 1 } },
      { item: 'Пісенник', amount: 1 },
    ],
    misc: [],
  },
  Paladin: {
    weapon: [
      { item: 'Молот', amount: 1, bonus: { STR: 1 } },
      { item: 'Святий меч', amount: 1, bonus: { STR: 2 } },
    ],
    armor: [
      { item: 'Латна броня', amount: 1, bonus: { CON: 2 } },
      { item: 'Святий щит', amount: 1, bonus: { CHA: 1 } },
    ],
    misc: [
      { item: 'Святий амулет', amount: 1 },
    ],
  },
};

const raceInventory = {
  Elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { DEX: 1 } }],
  Orc: [{ item: 'Кістяний талісман', amount: 1, bonus: { STR: 1 } }],
  Human: [{ item: 'Монета удачі', amount: 1, bonus: { CHA: 1 } }],
  Gnome: [{ item: 'Гвинтовий ключ', amount: 1 }],
  Dwarf: [{ item: 'Похідна кружка', amount: 1, bonus: { CON: 1 } }],
  Halfling: [{ item: 'Трубка та тютюн', amount: 1, bonus: { CHA: 1 } }],
  Demon: [{ item: 'Темний камінь', amount: 1, bonus: { INT: 1 } }],
  Beastkin: [{ item: 'Кігтістий амулет', amount: 1, bonus: { DEX: 1 } }],
  Angel: [{ item: 'Пір’я з крила', amount: 1, bonus: { CHA: 1 } }],
  Lizardman: [{ item: 'Луска пращура', amount: 1, bonus: { CON: 1 } }],
};


export const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomStats = (charClass) => {
  const stats = {
    hp: 10,
    mp: 10,
    strength: 10,
    agility: 10,
    intellect: 10,
  };

  switch (charClass) {
    case 'Warrior':
      stats.hp = randRange(16, 20);
      stats.mp = randRange(4, 8);
      stats.strength = randRange(12, 18);
      stats.agility = randRange(8, 14);
      stats.intellect = randRange(6, 12);
      break;
    case 'Wizard':
      stats.hp = randRange(6, 10);
      stats.mp = randRange(14, 18);
      stats.strength = randRange(6, 12);
      stats.agility = randRange(8, 14);
      stats.intellect = randRange(12, 18);
      break;
    default: // Rogue
      stats.hp = randRange(10, 14);
      stats.mp = randRange(8, 12);
      stats.strength = randRange(8, 14);
      stats.agility = randRange(12, 18);
      stats.intellect = randRange(8, 14);
      break;
  }

  return stats;
};

export const generateInventory = (race, charClass) => {
  const result = [];
  const classItems = classInventory[charClass] || {};
  Object.keys(classItems).forEach(cat => {
    const opts = classItems[cat];
    if (Array.isArray(opts) && opts.length) {
      const choice = getRandomElement(opts);
      result.push({ item: choice.item, amount: choice.amount ?? 1, bonus: choice.bonus || {} });
    }
  });
  const raceItems = raceInventory[race] || [];
  raceItems.forEach(it => {
    result.push({ item: it.item, amount: it.amount ?? 1, bonus: it.bonus || {} });
  });
  return result;
};
