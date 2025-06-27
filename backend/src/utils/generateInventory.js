
const slug = require('./slugify');
const { classInventory, raceInventory } = require('../data/staticInventoryTemplates');


function combine(arrays) {
  if (!arrays.length) return [[]];
  const [first, ...rest] = arrays;
  const combos = combine(rest);
  const result = [];
  for (const item of first) {
    for (const c of combos) {
      result.push([item, ...c]);
    }
  }
  return result;
}

const races = ['human', 'forest_elf', 'dark_elf', 'gnome', 'dwarf', 'orc'];
const startingSets = {};
for (const race of races) {
  startingSets[race] = {};
}
for (const [cls, groups] of Object.entries(classInventory)) {
  const arrays = Object.values(groups).filter(a => a.length);
  const combos = combine(arrays).slice(0, 3);
  for (const race of races) {
    startingSets[race][cls] = combos;
  }
}


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
