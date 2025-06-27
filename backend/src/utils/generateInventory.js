
const slug = require('./slugify');
const { raceInventory, startingSets } = require('../data/staticInventoryTemplates');

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateInventory(raceCode, classCode) {
  const result = [];

  const baseCode = raceCode.replace(/_(male|female)$/i, '');
  const sets = startingSets[baseCode]?.[classCode] || [];
  if (sets.length) {
    const selected = randomItem(sets);
    for (const item of selected) {
      result.push({
        item: item.item,
        code: slug(item.item),
        amount: item.amount ?? 1,
        bonus: item.bonus || {}
      });
    }
  }

  const raceItems = raceInventory[baseCode] || [];
  for (const r of raceItems) {
    result.push({
      item: r.item,
      code: slug(r.item),
      amount: r.amount ?? 1,
      bonus: r.bonus || {}
    });
  }

  if (!result.length) {
    console.warn(`No inventory generated for race ${raceCode} and class ${classCode}`);
  }

  return result;
}

module.exports = generateInventory;
