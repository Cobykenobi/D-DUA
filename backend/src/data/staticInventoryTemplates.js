const classInventory = {
  warrior: {
    mainWeapon: [
      {
        item: 'Рунічний меч',
        name: { uk: 'Рунічний меч', en: 'Runic Sword' },
        type: 'weapon',
        bonus: { strength: 2 },
        effect: 'Подвійний удар',
        description: {
          uk: 'Меч, викарбуваний древніми рунами, посилює силу володаря.',
          en: 'A sword etched with ancient runes that empowers its wielder.'
        }
      },
      {
        item: 'Бойова сокира',
        name: { uk: 'Бойова сокира', en: 'Battle Axe' },
        type: 'weapon',
        bonus: { strength: 2 },
        effect: 'Потужний розмах',
        description: {
          uk: 'Важка сокира, що прорубує найміцнішу броню.',
          en: 'A heavy axe capable of cleaving through sturdy armor.'
        }
      },
      {
        item: 'Піка',
        name: { uk: 'Піка', en: 'Pike' },
        type: 'weapon',
        bonus: { strength: 1 },
        effect: 'Довгий укол',
        description: {
          uk: 'Довге списоподібне знаряддя для утримання ворога на відстані.',
          en: 'A long spear-like weapon for keeping foes at bay.'
        }
      },
      {
        item: 'Глефа',
        name: { uk: 'Глефа', en: 'Glaive' },
        type: 'weapon',
        bonus: { strength: 1 },
        effect: 'Широкий розріз',
        description: {
          uk: 'Довга древкова зброя з лезом для кругових атак.',
          en: 'A pole weapon with a blade suited for sweeping strikes.'
        }
      },
      {
        item: 'Важкий молот',
        name: { uk: 'Важкий молот', en: 'War Hammer' },
        type: 'weapon',
        bonus: { strength: 2 },
        effect: 'Пригнічуючий удар',
        description: {
          uk: 'Могутній молот, що дробить кістки та обладунки.',
          en: 'A mighty hammer that crushes bones and armor.'
        }
      }
    ],
    defense: [
      {
        item: 'Щит',
        name: { uk: 'Щит', en: 'Shield' },
        type: 'armor',
        bonus: { defense: 1 },
        effect: 'Блокує атаку',
        description: {
          uk: 'Надійний щит для відбиття ворожих ударів.',
          en: 'A sturdy shield for blocking enemy strikes.'
        }
      },
      {
        item: 'Шолом',
        name: { uk: 'Шолом', en: 'Helmet' },
        type: 'armor',
        bonus: { defense: 1 },
        effect: 'Захист голови',
        description: {
          uk: 'Металевий шолом забезпечує додатковий захист.',
          en: 'A metal helmet providing additional protection.'
        }
      },
      {
        item: 'Кольчужна броня',
        name: { uk: 'Кольчужна броня', en: 'Chainmail Armor' },
        type: 'armor',
        bonus: { defense: 2 },
        effect: "Пом'якшує удари",
        description: {
          uk: 'Сітчаста броня, що добре амортизує пошкодження.',
          en: 'Interlinked armor that absorbs incoming blows.'
        }
      },
      {
        item: 'Наручи',
        name: { uk: 'Наручи', en: 'Bracers' },
        type: 'armor',
        bonus: { defense: 1 },
        effect: 'Захист рук',
        description: {
          uk: 'Шкіряні або металеві наручи захищають передпліччя.',
          en: 'Leather or metal bracers shielding the forearms.'
        }
      },
      {
        item: 'Наголінники',
        name: { uk: 'Наголінники', en: 'Greaves' },
        type: 'armor',
        bonus: { defense: 1 },
        effect: 'Захист ніг',
        description: {
          uk: 'Захисні пластини для гомілок.',
          en: 'Protective plates for the shins.'
        }
      }
    ],
    accessory: [
      {
        item: 'Кільце сили',
        name: { uk: 'Кільце сили', en: 'Ring of Power' },
        type: 'accessory',
        bonus: { strength: 1 },
        effect: 'Підсилює атаку',
        description: {
          uk: 'Древнє кільце, що збільшує фізичну силу.',
          en: 'An ancient ring that boosts physical strength.'
        }
      },
      {
        item: 'Оберіг',
        name: { uk: 'Оберіг', en: 'Talisman' },
        type: 'accessory',
        bonus: { defense: 1 },
        effect: 'Магічний захист',
        description: {
          uk: 'Талісман, який відводить зло від власника.',
          en: 'A charm that wards off harm from its bearer.'
        }
      },
      {
        item: 'Пояс витривалості',
        name: { uk: 'Пояс витривалості', en: 'Belt of Endurance' },
        type: 'accessory',
        bonus: { health: 1 },
        effect: 'Збільшує витривалість',
        description: {
          uk: 'Пояс, що додає власнику сил та здоров’я.',
          en: 'A belt that grants the wearer greater stamina.'
        }
      },
      {
        item: 'Рукавиці відваги',
        name: { uk: 'Рукавиці відваги', en: 'Gauntlets of Courage' },
        type: 'accessory',
        bonus: { strength: 1 },
        effect: 'Збільшує сміливість',
        description: {
          uk: 'Рукавиці, що вселяють хоробрість у бійця.',
          en: 'Gauntlets that inspire courage in battle.'
        }
      },
      {
        item: 'Плащ героя',
        name: { uk: 'Плащ героя', en: "Hero's Cloak" },
        type: 'accessory',
        bonus: { charisma: 1 },
        effect: 'Підвищує репутацію',
        description: {
          uk: 'Плащ, який робить воїна взірцем для оточуючих.',
          en: 'A cloak that makes the warrior a figure of renown.'
        }
      }
    ],
    potion: [
      {
        item: 'Зілля здоров’я',
        name: { uk: 'Зілля здоров’я', en: 'Health Potion' },
        type: 'potion',
        bonus: {},
        effect: 'Відновлює здоров’я',
        description: {
          uk: 'Швидко лікує рани та повертає сили.',
          en: 'Rapidly heals wounds and restores vitality.'
        }
      },
      {
        item: 'Еліксир сили',
        name: { uk: 'Еліксир сили', en: 'Strength Elixir' },
        type: 'potion',
        bonus: { strength: 1 },
        effect: 'Посилює міць',
        description: {
          uk: 'Додає фізичної сили на короткий час.',
          en: 'Temporarily increases physical power.'
        }
      },
      {
        item: 'Зілля захисту',
        name: { uk: 'Зілля захисту', en: 'Defense Potion' },
        type: 'potion',
        bonus: { defense: 1 },
        effect: 'Підвищує захист',
        description: {
          uk: 'Зміцнює шкіру, зменшуючи отримані пошкодження.',
          en: 'Hardens the skin, reducing incoming damage.'
        }
      },
      {
        item: 'Зілля швидкості',
        name: { uk: 'Зілля швидкості', en: 'Speed Potion' },
        type: 'potion',
        bonus: { agility: 1 },
        effect: 'Прискорює рухи',
        description: {
          uk: 'Надає вибух швидкості й спритності.',
          en: 'Grants a burst of quickness and agility.'
        }
      },
      {
        item: 'Зілля ярості',
        name: { uk: 'Зілля ярості', en: 'Rage Potion' },
        type: 'potion',
        bonus: {},
        effect: 'Підсилює атаку, але знижує захист',
        description: {
          uk: 'Викликає нестримну лють, збільшуючи силу ударів.',
          en: 'Invokes uncontrollable rage, boosting attack power.'
        }
      }
    ],
    special: [
      {
        item: 'Бойовий ріг',
        name: { uk: 'Бойовий ріг', en: 'Battle Horn' },
        type: 'special',
        bonus: {},
        effect: 'Надихає союзників',
        description: {
          uk: 'Сурма, звук якої піднімає бойовий дух.',
          en: "A horn whose sound boosts allies’ morale."
        }
      },
      {
        item: 'Метальна сокира',
        name: { uk: 'Метальна сокира', en: 'Throwing Axe' },
        type: 'special',
        bonus: { strength: 1 },
        effect: 'Дальня атака',
        description: {
          uk: 'Невелика сокира, придатна для кидка на відстань.',
          en: 'A small axe suited for throwing at range.'
        }
      },
      {
        item: 'Вогняна бомба',
        name: { uk: 'Вогняна бомба', en: 'Fire Bomb' },
        type: 'special',
        bonus: {},
        effect: 'Підпалює ціль',
        description: {
          uk: 'Кидається в ворога, розриваючись полум’ям.',
          en: 'Thrown at foes to engulf them in flames.'
        }
      },
      {
        item: 'Прапор війни',
        name: { uk: 'Прапор війни', en: 'War Banner' },
        type: 'special',
        bonus: { charisma: 1 },
        effect: 'Зміцнює дух',
        description: {
          uk: 'Піднятий прапор укріплює бойовий дух загону.',
          en: "Raising the banner strengthens the group’s morale."
        }
      },
      {
        item: 'Земляна пастка',
        name: { uk: 'Земляна пастка', en: 'Earth Trap' },
        type: 'special',
        bonus: {},
        effect: 'Затримує ворога',
        description: {
          uk: 'Прихована пастка, яка сповільнює ворогів.',
          en: 'A hidden trap that slows down enemies.'
        }
      }
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
  },
  rogue: {
    weapon: [
      { item: 'Кинджал', bonus: { agility: 1 } },
      { item: 'Легкий лук', bonus: { agility: 1 } }
    ],
    armor: [
      { item: 'Шкіряна броня', bonus: { agility: 1 } },
      { item: 'Плащ тіней', bonus: { agility: 1 } }
    ],
    misc: [
      { item: 'Набір відмичок' }
    ]
  },
  druid: {
    weapon: [
      { item: 'Дубовий посох', bonus: { intellect: 1 } },
      { item: 'Серп', bonus: { strength: 1 } }
    ],
    armor: [
      { item: 'Плетена броня', bonus: { defense: 1 } },
      { item: 'Талісман природи', bonus: { mp: 1 } }
    ],
    misc: [
      { item: 'Лікувальне зілля' }
    ]
  },
  necromancer: {
    weapon: [
      { item: 'Темний жезл', bonus: { intellect: 2 } },
      { item: 'Коса', bonus: { strength: 1 } }
    ],
    armor: [
      { item: 'Роба некроманта', bonus: { mp: 1 } },
      { item: 'Черепний амулет', bonus: { intellect: 1 } }
    ],
    misc: [
      { item: 'Мана-зілля' }
    ]
  }
};


const raceInventory = {
  human: [{ item: 'Монета удачі', bonus: { charisma: 1 } }],
  forest_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
  dark_elf: [{ item: 'Ельфійські стріли', bonus: { agility: 1 } }],
  orc: [{ item: 'Кістяний талісман', bonus: { strength: 1 } }],
  gnome: [{ item: 'Гвинтовий ключ' }],
  dwarf: [{ item: 'Похідна кружка', bonus: { health: 1 } }],
  halfling: [{ item: 'Карта скарбів', bonus: { agility: 1 } }],
  dragonborn: [{ item: 'Драконячий амулет', bonus: { strength: 1 } }],
  tiefling: [{ item: 'Кишенькове дзеркальце', bonus: { charisma: 1 } }]
};

module.exports = { classInventory, raceInventory };

