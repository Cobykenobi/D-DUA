export default [
  {
    code: "warrior",
    name: "Воїн",
    modifiers: { str: 2, con: 1 },
    inventory: ["Меч (+2 СИЛ)", "Латна броня (+2 ВИТ)"]
  },
  {
    code: "bard",
    name: "Бард",
    modifiers: { cha: 2, dex: 1 },
    inventory: ["Лютня (+2 ХАР)", "Пісенник"]
  },
  {
    code: "mage",
    name: "Маг",
    modifiers: { int: 2, wis: 1 },
    inventory: ["Жезл", "Магічна книга"]
  },
  {
    code: "cleric",
    name: "Клірик",
    modifiers: { wis: 2, con: 1 },
    inventory: ["Святий амулет", "Книга молитов"]
  },
  {
    code: "assassin",
    name: "Асасін",
    modifiers: { dex: 2, str: 1 },
    inventory: ["Кинджал", "Плащ тіні"]
  },
  {
    code: "rogue",
    name: "Злодій",
    modifiers: { dex: 2, int: 1 },
    inventory: ["Відмичка", "Короткий меч"]
  }
];
