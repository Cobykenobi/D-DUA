const { raceBonuses, classBonuses } = require('../data/classRaceBonuses');

const baseStats = {
  health: 5,
  defense: 5,
  strength: 5,
  intellect: 5,
  agility: 5,
  charisma: 5,
  mp: 5,
};

function applyBonuses(stats, bonuses) {
  for (const [key, value] of Object.entries(bonuses || {})) {
    if (stats[key] === undefined) stats[key] = 0;
    stats[key] += value;
  }
}

function generateStats(raceCode, professionCode) {
  const stats = { ...baseStats };

  const raceKey = (raceCode || '').replace(/_(male|female)$/i, '');
  const raceMods = raceBonuses[raceKey] || {};
  const classMods = classBonuses[professionCode] || {};

  applyBonuses(stats, raceMods);
  applyBonuses(stats, classMods);

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
