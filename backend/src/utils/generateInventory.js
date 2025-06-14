
const StartingSet = require('../models/StartingSet');

const raceInventory = {
  Elf: [{ item: 'Ельфійські стріли', amount: 1, bonus: { DEX: 1 } }],
  Orc: [{ item: 'Кістяний талісман', amount: 1, bonus: { STR: 1 } }],
  Human: [{ item: 'Монета удачі', amount: 1, bonus: { CHA: 1 } }],
  Gnome: [{ item: 'Гвинтовий ключ', amount: 1 }],
  Dwarf: [{ item: 'Похідна кружка', amount: 1, bonus: { CON: 1 } }],
  Halfling: [{ item: 'Трубка та тютюн', amount: 1, bonus: { CHA: 1 } }],
  Demon: [{ item: 'Темний камінь', amount: 1, bonus: { INT: 1 } }],
  Beastkin: [{ item: 'Кігтістий амулет', amount: 1, bonus: { DEX: 1 } }],
  Angel: [{ item: 'Пір’я з крила', amount: 1, bonus: { CHA: 1 } }],
  Lizardman: [{ item: 'Луска пращура', amount: 1, bonus: { CON: 1 } }]
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
