
const slug = require('./slugify');

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
  },
  archer: {
    weapon: [
      { item: 'Довгий лук', bonus: { agility: 2 } },
      { item: 'Арбалет', bonus: { agility: 1 } }
    ],
    armor: [
      { item: 'Шкіряна броня', bonus: { agility: 1 } },
      { item: 'Капюшон мисливця' }
    ],
    misc: [
      { item: 'Колчан стріл' }
    ]
  },
  healer: {
    weapon: [
      { item: 'Жезл зцілення', bonus: { intellect: 1 } },
      { item: 'Святий символ', bonus: { mp: 1 } }
    ],
    armor: [
      { item: 'Ряса', bonus: { health: 1 } },
      { item: 'Талісман віри', bonus: { charisma: 1 } }
    ],
    misc: [
      { item: 'Зілля лікування' }
    ]
  }
};

function combine(arrays) {
  if (!arrays.length) return [[]];
  const [first, ...rest] = arrays;
  const combos = combine(rest);
  const result = [];
  for (const item of first) {
    for (const c of combos) {
      result.push([item, ...c]);
    }
  }
  return result;
}

const races = ['human', 'forest_elf', 'dark_elf', 'gnome', 'dwarf', 'orc'];
const startingSets = {};
for (const race of races) {
  startingSets[race] = {};
}
for (const [cls, groups] of Object.entries(classInventory)) {
  const arrays = Object.values(groups).filter(a => a.length);
  const combos = combine(arrays).slice(0, 3);
  for (const race of races) {
    startingSets[race][cls] = combos;
  }
}

const raceInventory = {
  human: [{ item: 'Монета удачі', amount: 1, bonus: { charisma: 1 } }],
  forest_elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { agility: 1 } }],
  dark_elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { agility: 1 } }],
  orc: [{ item: 'Кістяний талісман', amount: 1, bonus: { strength: 1 } }],
  gnome: [{ item: 'Гвинтовий ключ', amount: 1 }],
  dwarf: [{ item: 'Похідна кружка', amount: 1, bonus: { health: 1 } }]
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateInventory(raceCode, classCode) {
  const result = [];

  const baseCode = raceCode.replace(/_(male|female)$/i, '');
  const sets = startingSets[baseCode]?.[classCode] || [];
  if (sets.length) {
    const selected = randomItem(sets);
    for (const item of selected) {
      result.push({
        item: item.item,
        code: slug(item.item),
        amount: item.amount ?? 1,
        bonus: item.bonus || {}
      });
    }
  }

  const raceItems = raceInventory[baseCode] || [];
  for (const r of raceItems) {
    result.push({
      item: r.item,
      code: slug(r.item),
      amount: r.amount ?? 1,
      bonus: r.bonus || {}
    });
  }

  if (!result.length) {
    console.warn(
      `generateInventory() returned empty array for race '${raceCode}' and class '${classCode}'`
    );
  }

  return result;
}

module.exports = generateInventory;
