const classInventory = {
  warrior: { mainWeapon: [], defense: [], accessory: [], potion: [], special: [] },
  wizard: { staff: [], accessory: [], scroll: [], special: [] },
  assassin: { weapon: [], armor: [], misc: [] },
  bard: { weapon: [], armor: [], misc: [] },
  paladin: { weapon: [], armor: [], misc: [] },
  archer: { weapon: [], armor: [], misc: [] },
  healer: { weapon: [], armor: [], misc: [] },
  rogue: { weapon: [], armor: [], misc: [] },
  druid: { weapon: [], armor: [], misc: [] },
  necromancer: { weapon: [], armor: [], misc: [] }
};

const raceInventory = {
  human: [],
  forest_elf: [],
  dark_elf: [],
  orc: [],
  gnome: [],
  dwarf: [],
  halfling: [],
  dragonborn: [],
  tiefling: []
};

module.exports = { classInventory, raceInventory };
