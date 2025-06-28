const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const StartingSet = require('../src/models/StartingSet');
const { classInventory, raceInventory } = require('../src/data/staticInventoryTemplates');

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
    const races = Object.keys(raceInventory);
    const classes = Object.keys(classInventory);
    for (const r of races) {
      for (const c of classes) {
        const count = await StartingSet.countDocuments({ raceCode: r, classCode: c });
        expect(count).toBe(3);
      }

    }
  });

  it('creates the correct total number of sets', async () => {
    const raceCount = Object.keys(raceInventory).length;
    const classCount = Object.keys(classInventory).length;
    const total = await StartingSet.countDocuments();
    expect(total).toBe(raceCount * classCount * 3);
  });
});
