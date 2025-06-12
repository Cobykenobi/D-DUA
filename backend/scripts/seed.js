require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Characteristic = require('../src/models/Characteristic');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment');
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGO_URI);


  const races = [
    'Human',
    'Elf',
    'Dwarf',
    'Orc',
    'Halfling',
    'Gnome',
    'Tiefling',
    'Dragonborn',
    'Half-Elf',
    'Half-Orc'
  ];
  const professions = [
    'Warrior',
    'Wizard',
    'Rogue',
    'Cleric',
    'Ranger',
    'Paladin',
    'Bard',
    'Druid',
    'Monk',
    'Barbarian'
  ];
  const characteristics = ['HP', 'MP', 'Strength', 'Agility', 'Intellect'];

  if (await Race.countDocuments() === 0) {
    await Race.insertMany(races.map(name => ({ name })));
    console.log('Races seeded');
  }

  if (await Profession.countDocuments() === 0) {
    await Profession.insertMany(professions.map(name => ({ name })));
    console.log('Professions seeded');
  }

  if (await Characteristic.countDocuments() === 0) {
    await Characteristic.insertMany(characteristics.map(name => ({ name })));
    console.log('Characteristics seeded');
  }

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
