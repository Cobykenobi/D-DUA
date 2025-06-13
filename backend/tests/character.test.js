const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Character = require('../src/models/Character');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Character');

describe('Character Controller - create', () => {

  it('populates inventory and creates stats object', async () => {
 main
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard' }]);
    let savedData;
    Character.mockImplementation(data => {
      savedData = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(savedData.inventory.length).toBeGreaterThanOrEqual(2);

    expect(savedData.stats).toHaveProperty('STR');
    expect(typeof savedData.stats.STR).toBe('number');
 main
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('returns 400 if races or professions are missing', async () => {
    Race.aggregate.mockResolvedValue([]);
    Race.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });
    Profession.aggregate.mockResolvedValue([]);
    Profession.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing races or professions to create character'
    });
  });
});
