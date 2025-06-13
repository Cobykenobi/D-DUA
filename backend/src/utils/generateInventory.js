const classInventory = {
  Warrior: ['Меч', 'Щит', 'Шкіряна броня', 'Зілля здоров’я'],
  Mage: ['Магічний посох', 'Книга заклять', 'Мана-зілля'],
  Rogue: ['Кинджал', 'Плащ тіні', 'Відмички'],
  Healer: ['Жезл лікування', 'Зілля лікування', 'Травник'],
  Ranger: ['Лук', 'Колчан стріл', 'Ніж для виживання'],
  Bard: ['Лютня', 'Легкий меч', 'Пісенник'],
  Paladin: ['Молот', 'Латна броня', 'Святий амулет'],
};

const raceInventory = {
  Elf: ['Ельфійські стріли'],
  Orc: ['Кістяний талісман'],
  Human: ['Монета удачі'],
  Gnome: ['Гвинтовий ключ'],
  Dwarf: ['Похідна кружка'],
  Halfling: ['Трубка та тютюн'],
  Demon: ['Темний камінь'],
  Beastkin: ['Кігтістий амулет'],
  Angel: ['Пір’я з крила'],
  Lizardman: ['Луска пращура'],
};

function generateInventory(race, charClass) {
  const classItems = classInventory[charClass] || [];
  const raceItems = raceInventory[race] || [];
  return [...classItems, ...raceItems].map(name => ({ item: name, amount: 1 }));
}

module.exports = generateInventory;
