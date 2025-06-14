const baseStats = {
  STR: 10,
  DEX: 10,
  INT: 10,
  CON: 10,
  CHA: 10,
};

const raceBonuses = {
  human:     { STR: 1, DEX: 1, INT: 1, CON: 1, CHA: 1 },
  elf:       { DEX: 2, INT: 1 },
  orc:       { STR: 2, CON: 1 },
  gnome:     { CON: 2, INT: 1 },
  dwarf:     { STR: 2, CHA: 1 },
  halfling:  { DEX: 2, CHA: 1 },
  demon:     { INT: 2, CHA: 1 },
  beastkin:  { DEX: 2, CON: 1 },
  angel:     { CHA: 2, INT: 1 },
  lizardman: { STR: 2, CON: 1 },
};

const classMinimums = {
  warrior: { STR: 13, CON: 12 },
  mage: { INT: 13, CHA: 11 },
  rogue: { DEX: 13, INT: 11 },
  healer: { CHA: 13, CON: 11 },
  ranger: { DEX: 12, STR: 12 },
  bard: { CHA: 13, DEX: 12 },
  paladin: { STR: 13, CHA: 13 },
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
