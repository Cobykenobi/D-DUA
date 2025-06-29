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
    staff: [
      {
        item: 'Посох Вогню',
        name: { uk: 'Посох Вогню', en: 'Staff of Fire' },
        type: 'weapon',
        bonus: {},
        effect: 'Кастує "вогняну кулю" (10 урону)',
        description: {
          uk: 'Вивергає полум’я при активації.',
          en: 'Erupts in flames when activated.'
        }
      },
      {
        item: 'Посох Льоду',
        name: { uk: 'Посох Льоду', en: 'Staff of Frost' },
        type: 'weapon',
        bonus: {},
        effect: 'Кастує "льодовий шип" (8 урону, уповільнює)',
        description: {
          uk: 'Заморожує ворогів.',
          en: 'Freezes enemies in place.'
        }
      },
      {
        item: 'Посох Блискавки',
        name: { uk: 'Посох Блискавки', en: 'Staff of Lightning' },
        type: 'weapon',
        bonus: {},
        effect: 'Кастує "електроудар" (12 урону)',
        description: {
          uk: 'Б’є блискавкою одну ціль.',
          en: 'Strikes a single target with lightning.'
        }
      },
      {
        item: 'Посох Мани',
        name: { uk: 'Посох Мани', en: 'Staff of Mana' },
        type: 'weapon',
        bonus: { mp: 1 },
        effect: '+1 до кількості заклять за гру',
        description: {
          uk: 'Фокусує чарівну силу.',
          en: 'Focuses arcane power.'
        }
      },
      {
        item: 'Посох Ілюзії',
        name: { uk: 'Посох Ілюзії', en: 'Staff of Illusion' },
        type: 'weapon',
        bonus: {},
        effect: 'Один раз створює копію мага',
        description: {
          uk: 'Збиває ворогів з пантелику.',
          en: 'Confuses foes with a duplicate.'
        }
      }
    ],
    accessory: [
      {
        item: 'Амулет Мудрості',
        name: { uk: 'Амулет Мудрості', en: 'Amulet of Wisdom' },
        type: 'accessory',
        bonus: { intellect: 1 },
        effect: '+1 до точності заклять',
        description: {
          uk: 'Давній символ ерудиції.',
          en: 'An ancient symbol of erudition.'
        }
      },
      {
        item: 'Перстень Захисту',
        name: { uk: 'Перстень Захисту', en: 'Ring of Defense' },
        type: 'accessory',
        bonus: { defense: 2 },
        effect: '+2 AC',
        description: {
          uk: 'Магічна броня навколо тіла.',
          en: 'A protective magical barrier.'
        }
      },
      {
        item: 'Кулон Мовчання',
        name: { uk: 'Кулон Мовчання', en: 'Pendant of Silence' },
        type: 'accessory',
        bonus: {},
        effect: 'Відміняє 1 вороже закляття',
        description: {
          uk: 'Захист від ворожої магії.',
          en: 'Cancels one enemy spell.'
        }
      },
      {
        item: 'Очі Знання',
        name: { uk: 'Очі Знання', en: 'Eyes of Knowledge' },
        type: 'accessory',
        bonus: {},
        effect: 'Показують здоров’я ворога',
        description: {
          uk: 'Відкривають істину.',
          en: 'Reveal the enemy’s health.'
        }
      },
      {
        item: 'Талісман Каналізації',
        name: { uk: 'Талісман Каналізації', en: 'Channeling Talisman' },
        type: 'accessory',
        bonus: {},
        effect: '-1 до часу читання закляття',
        description: {
          uk: 'Фокусує заклинання швидше.',
          en: 'Helps channel spells faster.'
        }
      }
    ],
    scroll: [
      {
        item: 'Свиток Вибуху',
        name: { uk: 'Свиток Вибуху', en: 'Scroll of Blast' },
        type: 'scroll',
        bonus: {},
        effect: 'Викликає вибух у зоні (AoE, 8 урону)',
        description: {
          uk: 'Одноразове використання.',
          en: 'Single-use area explosion.'
        }
      },
      {
        item: 'Свиток Щита',
        name: { uk: 'Свиток Щита', en: 'Scroll of Shield' },
        type: 'scroll',
        bonus: {},
        effect: '+5 AC на 1 хід',
        description: {
          uk: 'Захист з енергії.',
          en: 'Creates a shield of energy.'
        }
      },
      {
        item: 'Свиток Освітлення',
        name: { uk: 'Свиток Освітлення', en: 'Scroll of Light' },
        type: 'scroll',
        bonus: {},
        effect: 'Освітлює зону',
        description: {
          uk: 'Проганяє темряву.',
          en: 'Dispels darkness in the area.'
        }
      },
      {
        item: 'Свиток Знищення',
        name: { uk: 'Свиток Знищення', en: 'Scroll of Destruction' },
        type: 'scroll',
        bonus: {},
        effect: 'Знищує 1 слабкий об\'єкт',
        description: {
          uk: 'Розкладає на молекули.',
          en: 'Disintegrates a weak object.'
        }
      },
      {
        item: 'Свиток Туману',
        name: { uk: 'Свиток Туману', en: 'Scroll of Mist' },
        type: 'scroll',
        bonus: {},
        effect: 'Створює хмару для втечі',
        description: {
          uk: 'Ідеальний для відступу.',
          en: 'Creates cover for retreat.'
        }
      }
    ],
    clothing: [
      {
        item: 'Мантія Магістра',
        name: { uk: 'Мантія Магістра', en: 'Robe of the Magister' },
        type: 'clothing',
        bonus: { defense: 1, charisma: 1 },
        effect: '+1 AC, +1 до харизми',
        description: {
          uk: 'Показує статус.',
          en: 'Signifies high status.'
        }
      },
      {
        item: 'Каптур Аркани',
        name: { uk: 'Каптур Аркани', en: 'Arcane Hood' },
        type: 'clothing',
        bonus: { agility: 1 },
        effect: 'Маскує мага (+1 stealth)',
        description: {
          uk: 'Зменшує помітність.',
          en: 'Conceals the mage.'
        }
      },
      {
        item: 'Чоботи Левітації',
        name: { uk: 'Чоботи Левітації', en: 'Boots of Levitation' },
        type: 'clothing',
        bonus: {},
        effect: 'Дозволяють літати 2 раунди',
        description: {
          uk: 'Парить над полем бою.',
          en: 'Allows flight for two rounds.'
        }
      },
      {
        item: 'Пояс Фокусування',
        name: { uk: 'Пояс Фокусування', en: 'Focus Belt' },
        type: 'clothing',
        bonus: { intellect: 1 },
        effect: '+1 до сили заклять',
        description: {
          uk: 'Збирає енергію в центрі тіла.',
          en: 'Concentrates energy at the core.'
        }
      },
      {
        item: 'Плащ Тіней',
        name: { uk: 'Плащ Тіней', en: 'Cloak of Shadows' },
        type: 'clothing',
        bonus: {},
        effect: 'Дає невидимість на 1 хід',
        description: {
          uk: 'Зливається з темрявою.',
          en: 'Blends into the darkness.'
        }
      }
    ],
    special: [
      {
        item: 'Орб Прозріння',
        name: { uk: 'Орб Прозріння', en: 'Orb of Foresight' },
        type: 'special',
        bonus: {},
        effect: 'Побачити дії ворога наступним ходом',
        description: {
          uk: 'Передбачає хід ворога.',
          en: "Reveals the enemy's next turn."
        }
      },
      {
        item: 'Сфера Забуття',
        name: { uk: 'Сфера Забуття', en: 'Sphere of Forgetting' },
        type: 'special',
        bonus: {},
        effect: 'Стирає памʼять ворога (втрачає одну дію)',
        description: {
          uk: 'Таємне знання.',
          en: 'Erases one enemy action.'
        }
      },
      {
        item: 'Дзеркало Клонів',
        name: { uk: 'Дзеркало Клонів', en: 'Mirror of Clones' },
        type: 'special',
        bonus: {},
        effect: 'Створює ілюзію копії на 1 хід',
        description: {
          uk: 'Заплутує противника.',
          en: 'Creates a temporary clone.'
        }
      },
      {
        item: 'Зірка Часу',
        name: { uk: 'Зірка Часу', en: 'Star of Time' },
        type: 'special',
        bonus: {},
        effect: 'Відновлює 1 використаний предмет',
        description: {
          uk: 'Маніпуляція з часом.',
          en: 'Restores one used item.'
        }
      },
      {
        item: 'Книга Катастроф',
        name: { uk: 'Книга Катастроф', en: 'Book of Catastrophe' },
        type: 'special',
        bonus: {},
        effect: 'Разова атака на 20 шкоди',
        description: {
          uk: 'Темне знання в обкладинці.',
          en: 'Unleashes a devastating strike.'
        }
      }
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

