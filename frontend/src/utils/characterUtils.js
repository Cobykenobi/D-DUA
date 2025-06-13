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
  Warrior: ['Меч', 'Щит', 'Шкіряна броня', 'Зілля здоров’я'],
  Mage: ['Магічний посох', 'Книга заклять', 'Мана-зілля'],
  Rogue: ['Кинджал', 'Плащ тіні', 'Відмички'],
  Healer: ['Жезл лікування', 'Зілля лікування', 'Травник'],
  Ranger: ['Лук', 'Колчан стріл', 'Ніж для виживання'],
  Bard: ['Лютня', 'Легкий меч', 'Пісенник'],
  Paladin: ['Молот', 'Латна броня', 'Святий амулет'],
};

const raceInventory = {
  Elf: ['Ельфійські стріли'],
  Orc: ['Кістяний талісман'],
  Human: ['Монета удачі'],
  Gnome: ['Гвинтовий ключ'],
  Dwarf: ['Похідна кружка'],
  Halfling: ['Трубка та тютюн'],
  Demon: ['Темний камінь'],
  Beastkin: ['Кігтістий амулет'],
  Angel: ['Пір’я з крила'],
  Lizardman: ['Луска пращура'],
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
  const classItems = classInventory[charClass] || [];
  const raceItems = raceInventory[race] || [];
  return [...classItems, ...raceItems];
};
