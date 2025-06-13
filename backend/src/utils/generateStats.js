const baseStats = {
  STR: 10,
  DEX: 10,
  INT: 10,
  CON: 10,
  CHA: 10,
};

const raceBonuses = {
  Human:     { STR: 1, DEX: 1, INT: 1, CON: 1, CHA: 1 },
  Elf:       { DEX: 2, INT: 1 },
  Orc:       { STR: 2, CON: 1 },
  Gnome:     { CON: 2, INT: 1 },
  Dwarf:     { STR: 2, CHA: 1 },
  Halfling:  { DEX: 2, CHA: 1 },
  Demon:     { INT: 2, CHA: 1 },
  Beastkin:  { DEX: 2, CON: 1 },
  Angel:     { CHA: 2, INT: 1 },
  Lizardman: { STR: 2, CON: 1 },
};

const classMinimums = {
  Warrior: { STR: 13, CON: 12 },
  Mage: { INT: 13, CHA: 11 },
  Rogue: { DEX: 13, INT: 11 },
  Healer: { CHA: 13, CON: 11 },
  Ranger: { DEX: 12, STR: 12 },
  Bard: { CHA: 13, DEX: 12 },
  Paladin: { STR: 13, CHA: 13 },
};

function generateStats(race, charClass) {
  const stats = { ...baseStats };

  const bonuses = raceBonuses[race] || {};
  for (const key in bonuses) {
    stats[key] += bonuses[key];
  }

  const mins = classMinimums[charClass] || {};
  for (const key in mins) {
    if (stats[key] < mins[key]) {
      stats[key] = mins[key];
    }
  }

  for (const key of Object.keys(stats)) {
    const hasBonus = bonuses[key] !== undefined;
    const hasMin = mins[key] !== undefined;
    if (!hasBonus && !hasMin) {
      stats[key] = Math.max(stats[key], Math.floor(Math.random() * 8) + 8);
    }
  }

  return stats;
}

module.exports = generateStats;
