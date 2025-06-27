
const slug = require('./slugify');

const { raceInventory, startingSets } = require('../data/staticInventoryTemplates');


function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateInventory(raceCode, classCode) {
  const result = [];

  const baseCode = raceCode.replace(/_(male|female)$/i, '');

  try {
    const sets = await StartingSet.find({ raceCode: baseCode, classCode }).populate('items');
    if (sets.length) {
      const selected = randomItem(sets);
      if (selected.items && selected.items.length) {
        for (const item of selected.items) {
          result.push({
            item: item.name,
            code: item.code || slug(item.name),
            amount: 1,
            bonus: item.bonuses ? Object.fromEntries(item.bonuses) : {}
          });
        }
      }
    }
  } catch (err) {
    // ignore db errors, fallback to static sets
  }

  if (!result.length) {
    const sets = startingSets[baseCode]?.[classCode] || [];
    if (sets.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`DB starting set missing for race ${baseCode} class ${classCode}`);
      }
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
    console.warn(
      `generateInventory() returned empty array for race '${raceCode}' and class '${classCode}'`
    );
  }

  return result;
}

module.exports = generateInventory;
