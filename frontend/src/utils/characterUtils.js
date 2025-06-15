export const races = [
  'Human (male)',
  'Human (female)',
  'Elf (male)',
  'Elf (female)',
  'Orc (male)',
  'Orc (female)',
  'Gnome (male)',
  'Gnome (female)',
  'Dwarf (male)',
  'Dwarf (female)'
];
export const classes = [
  'Warrior',
  'Mage',
  'Archer',
  'Paladin',
  'Bard',
  'Healer'
];



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

