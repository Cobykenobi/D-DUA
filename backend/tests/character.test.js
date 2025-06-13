const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Character = require('../src/models/Character');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Character');

describe('Character Controller - create', () => {

  it('applies race bonuses and class minimums', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf', bonuses: { INT: 2, DEX: 1 } }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', minStats: { INT: 12 } }]);
    const chars = [
      { _id: 's1', name: 'STR' },
      { _id: 's2', name: 'DEX' },
      { _id: 's3', name: 'INT' },
      { _id: 's4', name: 'CON' },
      { _id: 's5', name: 'CHA' },
    ];
    Characteristic.find.mockResolvedValue(chars);
 main
    let savedData;
    Character.mockImplementation(data => {
      savedData = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    jest.spyOn(Math, 'random').mockReturnValue(0);

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    Math.random.mockRestore();

    expect(savedData.inventory.length).toBeGreaterThanOrEqual(2);

    const statMap = Object.fromEntries(savedData.stats.map(s => [s.characteristic, s.value]));
    expect(statMap['s3']).toBeGreaterThanOrEqual(12); // INT minimum applied
    expect(statMap['s2']).toBe(4); // DEX base 3 + race bonus 1
 main
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('returns 400 if races or professions are missing', async () => {
    Race.aggregate.mockResolvedValue([]);
    Race.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });
    Profession.aggregate.mockResolvedValue([]);
    Profession.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });

    Characteristic.find.mockResolvedValue([{ _id: 's1', name: 'STR' }]);
 main

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing races or professions to create character'
    });
  });
});
