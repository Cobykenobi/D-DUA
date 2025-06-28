const raceBonuses = {
  human: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  forest_elf: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 2, charisma: 0, mp: 0 },
  dark_elf: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 1, charisma: 0, mp: 0 },
  gnome: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  dwarf: { health: 1, defense: 1, strength: 0, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  orc: { health: 1, defense: 0, strength: 2, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  halfling: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 1, charisma: 1, mp: 0 },
  dragonborn: { health: 1, defense: 0, strength: 1, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  tiefling: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 0, charisma: 1, mp: 0 }
};

const classBonuses = {
  warrior: { health: 0, defense: 1, strength: 2, intellect: 0, agility: 0, charisma: 0, mp: 0 },
  wizard: { health: 0, defense: 0, strength: 0, intellect: 2, agility: 0, charisma: 0, mp: 1 },
  assassin: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 1, charisma: 0, mp: 0 },
  paladin: { health: 1, defense: 0, strength: 1, intellect: 0, agility: 0, charisma: 1, mp: 0 },
  bard: { health: 0, defense: 0, strength: 0, intellect: 0, agility: 0, charisma: 1, mp: 0 },
  archer: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 2, charisma: 0, mp: 0 },
  healer: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 0, charisma: 1, mp: 1 },
  rogue: { health: 0, defense: 0, strength: 1, intellect: 0, agility: 2, charisma: 0, mp: 0 },
  druid: { health: 0, defense: 0, strength: 0, intellect: 1, agility: 0, charisma: 1, mp: 1 },
  necromancer: { health: 0, defense: 0, strength: 0, intellect: 2, agility: 0, charisma: 0, mp: 1 }
};

module.exports = { raceBonuses, classBonuses };
