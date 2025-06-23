const Race = require('../models/Race');
const Profession = require('../models/Profession');

const baseStats = {
  health: 5,
  defense: 5,
  strength: 5,
  intellect: 5,
  agility: 5,
  charisma: 5,
};


function toObj(map) {
  if (!map) return {};
  if (typeof map.entries === 'function') {
    return Object.fromEntries(map.entries());
  }
  return map;
}


async function generateStats(raceCode, professionCode) {
  const stats = { ...baseStats };

  const race = await Race.findOne({ code: raceCode });
  const profession = await Profession.findOne({ code: professionCode });

  const raceMods = toObj(race && race.modifiers);
  for (const key in raceMods) {
    if (stats[key] === undefined) stats[key] = 0;
    stats[key] += raceMods[key];
  }

  const profMods = toObj(profession && profession.modifiers);
  for (const key in profMods) {
    if (stats[key] === undefined) stats[key] = 0;
    stats[key] += profMods[key];
  }

  for (const key of Object.keys(stats)) {
    const hasRace = raceMods[key] !== undefined;
    const hasClass = profMods[key] !== undefined;
    if (!hasRace && !hasClass) {
      stats[key] = Math.max(stats[key], Math.floor(Math.random() * 8) + 3);
    }
  }

  return stats;
}

module.exports = generateStats;
