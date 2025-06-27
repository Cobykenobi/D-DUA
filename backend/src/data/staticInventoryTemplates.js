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


const raceInventory = {
  human: [{ item: 'Монета удачі', bonus: { charisma: 1 } }],
  forest_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
  dark_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
  orc: [{ item: 'Кістяний талісман', bonus: { strength: 1 } }],
  gnome: [{ item: 'Гвинтовий ключ' }],
  dwarf: [{ item: 'Похідна кружка', bonus: { health: 1 } }]
};

module.exports = { classInventory, raceInventory };

