const baseStats = {
  health: 5,
  defense: 5,
  strength: 5,
  intellect: 5,
  agility: 5,
  charisma: 5,
};

const raceModifiers = {
  human: {
    male: { health: 1, defense: 1, strength: 1, intellect: 1, agility: 1, charisma: 1 },
    female: { health: 1, defense: 1, strength: 1, intellect: 1, agility: 1, charisma: 1 },
  },
  elf: {
    male: { agility: 2, intellect: 1 },
    female: { agility: 2, intellect: 1 },
  },
  orc: {
    male: { strength: 2, health: 1 },
    female: { strength: 2, health: 1 },
  },
  gnome: {
    male: { health: 2, intellect: 1 },
    female: { health: 2, intellect: 1 },
  },
  dwarf: {
    male: { strength: 2, charisma: 1 },
    female: { strength: 2, charisma: 1 },
  },
};

const classModifiers = {
  warrior: { strength: 2, defense: 1 },
  mage: { intellect: 2, charisma: 1 },
  healer: { charisma: 2, health: 1 },
  archer: { agility: 1, strength: 1 },
  bard: { charisma: 2, agility: 1 },
  paladin: { strength: 2, charisma: 2 },
};

function generateStats(race, charClass, gender = 'male') {
  const stats = { ...baseStats };

  const raceMods = (raceModifiers[race] && raceModifiers[race][gender]) || {};
  for (const key in raceMods) {
    stats[key] += raceMods[key];
  }

  const classMods = classModifiers[charClass] || {};
  for (const key in classMods) {
    stats[key] += classMods[key];
  }

  for (const key of Object.keys(stats)) {
    const hasRace = raceMods[key] !== undefined;
    const hasClass = classMods[key] !== undefined;
    if (!hasRace && !hasClass) {
      stats[key] = Math.max(stats[key], Math.floor(Math.random() * 8) + 3);
    }
  }

  return stats;
}

module.exports = generateStats;
