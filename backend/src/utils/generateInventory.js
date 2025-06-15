
const StartingSet = require('../models/StartingSet');

const raceInventory = {
  elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { agility: 1 } }],
  orc: [{ item: 'Кістяний талісман', amount: 1, bonus: { strength: 1 } }],
  human: [{ item: 'Монета удачі', amount: 1, bonus: { charisma: 1 } }],
  gnome: [{ item: 'Гвинтовий ключ', amount: 1 }],
  dwarf: [{ item: 'Похідна кружка', amount: 1, bonus: { health: 1 } }],
  halfling: [{ item: 'Трубка та тютюн', amount: 1, bonus: { charisma: 1 } }],
  demon: [{ item: 'Темний камінь', amount: 1, bonus: { intellect: 1 } }],
  beastkin: [{ item: 'Кігтістий амулет', amount: 1, bonus: { agility: 1 } }],
  angel: [{ item: 'Пір’я з крила', amount: 1, bonus: { charisma: 1 } }],
  lizardman: [{ item: 'Луска пращура', amount: 1, bonus: { health: 1 } }]
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateInventory(raceCode, classCode) {
  const result = [];

  const sets = await StartingSet.find({ classCode }).populate('items');
  if (sets.length) {
    const selected = randomItem(sets);
    for (const item of selected.items) {
      const bonuses = item.bonuses ? Object.fromEntries(item.bonuses) : {};
      result.push({ item: item.name, amount: 1, bonus: bonuses });
    }
  }

  const baseCode = raceCode.split('_')[0];
  const raceItems = raceInventory[baseCode] || [];
  for (const r of raceItems) {
    result.push({ item: r.item, amount: r.amount ?? 1, bonus: r.bonus || {} });
  }

  if (!result.length) {
    console.warn(`No inventory generated for race ${raceCode} and class ${classCode}`);
  }

  return result;
}

module.exports = generateInventory;
