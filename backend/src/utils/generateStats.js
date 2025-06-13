const raceBonuses = {
  Elf: { agility: 2, intellect: 1 },
  Dwarf: { strength: 2 },
  Human: { strength: 1, agility: 1, intellect: 1 }
};

const classMinimums = {
  Warrior: { strength: 13, hp: 15 },
  Wizard: { intellect: 12 },
  Rogue: { agility: 12 }
};

/**
 * Generate stats array based on available characteristics, race and class.
 * @param {Array} characteristics - list of characteristic docs with _id and name
 * @param {string} raceName - name of the race
 * @param {string} className - name of the profession/class
 * @returns {Array<{characteristic: string, value: number}>}
 */
function generateStats(characteristics, raceName, className) {
  const stats = {};
  // 1. start all at 10
  characteristics.forEach(c => {
    stats[c._id] = 10;
  });

  // 2. apply race bonuses
  const raceMods = raceBonuses[raceName] || {};
  Object.entries(raceMods).forEach(([name, bonus]) => {
    const char = characteristics.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (char) {
      stats[char._id] += bonus;
    }
  });

  // 3. enforce class minimums
  const classMins = classMinimums[className] || {};
  Object.entries(classMins).forEach(([name, min]) => {
    const char = characteristics.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (char) {
      if (stats[char._id] < min) stats[char._id] = min;
    }
  });

  // 4. randomize remaining values to 8-15
  characteristics.forEach(c => {
    const name = c.name.toLowerCase();
    const hasBonus = raceMods[name] !== undefined;
    const hasMin = classMins[name] !== undefined;
    if (!hasBonus && !hasMin) {
      stats[c._id] = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
    }
  });

  return Object.entries(stats).map(([id, value]) => ({ characteristic: id, value }));
}

module.exports = generateStats;
