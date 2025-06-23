const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const StartingSet = require('../src/models/StartingSet');

jest.setTimeout(30000);

describe('seed script', () => {
  let mongo;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const seed = require('../scripts/seed');
    await seed();
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
    console.log.mockRestore();
    console.warn.mockRestore();
  });


  it('creates three sets for each race and class combination', async () => {
    const races = [
      'human_male','human_female','elf_male','elf_female',
      'orc_male','orc_female','gnome_male','gnome_female',
      'dwarf_male','dwarf_female'
    ];
    const classes = ['warrior','mage','archer','paladin','bard','healer'];
    for (const r of races) {
      for (const c of classes) {
        const count = await StartingSet.countDocuments({ raceCode: r, classCode: c });
        expect(count).toBe(3);
      }

    }
  });
});
