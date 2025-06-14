const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Character = require('../src/models/Character');
const StartingSet = require('../src/models/StartingSet');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Character');
jest.mock('../src/models/StartingSet');

describe('Character Controller - create', () => {
  it('applies race bonuses and class minimums', async () => {

    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf', code: 'elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Mage', code: 'mage' }]);
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    jest.spyOn(Math, 'random').mockReturnValue(0);

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    Math.random.mockRestore();

    expect(saved.stats.INT).toBeGreaterThanOrEqual(13); // Mage minimum
    expect(saved.stats.DEX).toBe(12); // Elf bonus applied
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('returns 400 if races or professions are missing', async () => {
    Race.aggregate.mockResolvedValue([]);
    Race.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });
    Profession.aggregate.mockResolvedValue([]);
    Profession.find.mockReturnValue({ limit: jest.fn().mockResolvedValue([]) });
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing races or professions to create character'
    });
  });

  it('uses uploaded avatar when file provided', async () => {

    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf', code: 'elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Mage', code: 'mage' }]);
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = {
      user: { id: 'u1' },
      body: { name: 'Hero', description: '' },
      file: { filename: 'avatar.png' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(saved.image).toBe('/uploads/avatars/avatar.png');
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
