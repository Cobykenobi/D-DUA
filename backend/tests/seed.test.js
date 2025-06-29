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


  it('does not create starting sets when templates are empty', async () => {
    const total = await StartingSet.countDocuments();
    expect(total).toBe(0);
  });
});
