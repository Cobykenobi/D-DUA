
const StartingSet = require('../models/StartingSet');

const raceInventory = {
  elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { DEX: 1 } }],
  orc: [{ item: 'Кістяний талісман', amount: 1, bonus: { STR: 1 } }],
  human: [{ item: 'Монета удачі', amount: 1, bonus: { CHA: 1 } }],
  gnome: [{ item: 'Гвинтовий ключ', amount: 1 }],
  dwarf: [{ item: 'Похідна кружка', amount: 1, bonus: { CON: 1 } }],
  halfling: [{ item: 'Трубка та тютюн', amount: 1, bonus: { CHA: 1 } }],
  demon: [{ item: 'Темний камінь', amount: 1, bonus: { INT: 1 } }],
  beastkin: [{ item: 'Кігтістий амулет', amount: 1, bonus: { DEX: 1 } }],
  angel: [{ item: 'Пір’я з крила', amount: 1, bonus: { CHA: 1 } }],
  lizardman: [{ item: 'Луска пращура', amount: 1, bonus: { CON: 1 } }]
};

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateInventory(race, charClass) {
  const result = [];

  const sets = await StartingSet.find({ className: charClass }).populate('items');
  if (sets.length) {
    const selected = randomItem(sets);
    for (const item of selected.items) {
      const bonuses = item.bonuses ? Object.fromEntries(item.bonuses) : {};
      result.push({ item: item.name, amount: 1, bonus: bonuses });
    }
  }

  const raceItems = raceInventory[race] || [];
  for (const r of raceItems) {
    result.push({ item: r.item, amount: r.amount ?? 1, bonus: r.bonus || {} });
  }

  return result;
}

module.exports = generateInventory;
