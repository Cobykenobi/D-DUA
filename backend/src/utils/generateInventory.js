const classInventory = {
  Warrior: {
    weapon: [
      { item: 'Меч', amount: 1, bonus: { STR: 2 } },
      { item: 'Сокира', amount: 1, bonus: { STR: 2 } }
    ],
    armor: [
      { item: 'Щит', amount: 1, bonus: { CON: 1 } },
      { item: 'Шкіряна броня', amount: 1, bonus: { DEX: 1 } }
    ],
    misc: [
      { item: 'Зілля здоров’я', amount: 1 }
    ]
  },
  Mage: {
    weapon: [
      { item: 'Магічний посох', amount: 1, bonus: { INT: 2 } },
      { item: 'Чарівна паличка', amount: 1, bonus: { INT: 1 } }
    ],
    armor: [
      { item: 'Обруч мудрості', amount: 1, bonus: { INT: 1 } },
      { item: 'Тканинна мантія', amount: 1, bonus: { CON: 1 } }
    ],
    misc: [
      { item: 'Мана-зілля', amount: 1 },
      { item: 'Книга заклять', amount: 1 }
    ]
  },
  Rogue: {
    weapon: [
      { item: 'Кинджал', amount: 1, bonus: { DEX: 1 } },
      { item: 'Короткий меч', amount: 1, bonus: { DEX: 1 } }
    ],
    armor: [
      { item: 'Плащ тіні', amount: 1, bonus: { DEX: 1 } },
      { item: 'Легка броня', amount: 1, bonus: { DEX: 1 } }
    ],
    misc: [
      { item: 'Відмички', amount: 1 }
    ]
  },
  Healer: {
    weapon: [
      { item: 'Жезл лікування', amount: 1, bonus: { CHA: 1 } },
      { item: 'Священний посох', amount: 1, bonus: { CHA: 1 } }
    ],
    armor: [
      { item: 'Легка ряса', amount: 1, bonus: { CON: 1 } },
      { item: 'Травник', amount: 1 }
    ],
    misc: [
      { item: 'Зілля лікування', amount: 1 }
    ]
  },
  Ranger: {
    weapon: [
      { item: 'Лук', amount: 1, bonus: { DEX: 1 } },
      { item: 'Арбалет', amount: 1, bonus: { DEX: 1 } }
    ],
    armor: [
      { item: 'Шкіряна броня', amount: 1, bonus: { DEX: 1 } },
      { item: 'Ніж для виживання', amount: 1 }
    ],
    misc: [
      { item: 'Колчан стріл', amount: 1 }
    ]
  },
  Bard: {
    weapon: [
      { item: 'Лютня', amount: 1, bonus: { CHA: 1 } },
      { item: 'Легкий меч', amount: 1, bonus: { DEX: 1 } }
    ],
    armor: [
      { item: 'Короткий лук', amount: 1, bonus: { DEX: 1 } },
      { item: 'Пісенник', amount: 1 }
    ],
    misc: []
  },
  Paladin: {
    weapon: [
      { item: 'Молот', amount: 1, bonus: { STR: 1 } },
      { item: 'Святий меч', amount: 1, bonus: { STR: 2 } }
    ],
    armor: [
      { item: 'Латна броня', amount: 1, bonus: { CON: 2 } },
      { item: 'Святий щит', amount: 1, bonus: { CHA: 1 } }
    ],
    misc: [
      { item: 'Святий амулет', amount: 1 }
    ]
  }
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
  Lizardman: [{ item: 'Луска пращура', amount: 1, bonus: { CON: 1 } }]
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateInventory(race, charClass) {
  const result = [];
  const classItems = classInventory[charClass] || {};
  for (const category of Object.keys(classItems)) {
    const options = classItems[category];
    if (Array.isArray(options) && options.length) {
      const choice = randomItem(options);
      result.push({ item: choice.item, amount: choice.amount ?? 1, bonus: choice.bonus || {} });
    }
  }
  const raceItems = raceInventory[race] || [];
  for (const r of raceItems) {
    result.push({ item: r.item, amount: r.amount ?? 1, bonus: r.bonus || {} });
  }
  return result;
}

module.exports = generateInventory;
