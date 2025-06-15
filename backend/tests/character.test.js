const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Character = require('../src/models/Character');
const StartingSet = require('../src/models/StartingSet');
const generateInventory = require('../src/utils/generateInventory');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Character');
jest.mock('../src/models/StartingSet');
jest.mock('../src/utils/generateInventory');

beforeEach(() => {
  jest.clearAllMocks();
  generateInventory.mockResolvedValue([]);
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  const q = Promise.resolve({ _id: 'c1', race: { name: 'Elf', code: 'elf' }, profession: { name: 'Mage', code: 'mage' } });
  q.populate = jest.fn().mockReturnValue(q);
  Character.findById = jest.fn(() => q);
});

afterEach(() => {
  console.warn.mockRestore();
});

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

  it('passes codes to generateInventory and saves its result', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf', code: 'elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Mage', code: 'mage' }]);

    const inv = [{ item: 'Test', amount: 1, bonus: {} }];
    generateInventory.mockResolvedValue(inv);

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = { user: { id: 'u1' }, body: { name: 'Hero' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(generateInventory).toHaveBeenCalledWith('elf', 'mage');
    expect(saved.inventory).toEqual(inv);
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

  it('returns 400 when name is invalid', async () => {
    const req = { user: { id: 'u1' }, body: { description: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid name' });
    expect(Race.aggregate).not.toHaveBeenCalled();
  });

  it('returns 400 when description is too long', async () => {
    const desc = 'a'.repeat(501);
    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: desc } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid description' });
  });

  it('returns 400 when image is invalid', async () => {
    const req = { user: { id: 'u1' }, body: { name: 'Hero', image: {} } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid image' });
  });

  it('uses provided raceId and professionId', async () => {
    Race.findById.mockResolvedValue({ _id: 'r2', name: 'Orc', code: 'orc' });
    Profession.findById.mockResolvedValue({ _id: 'p2', name: 'Rogue', code: 'rogue' });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = { user: { id: 'u1' }, body: { name: 'Hero', raceId: 'r2', professionId: 'p2' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(Race.findById).toHaveBeenCalledWith('r2');
    expect(Profession.findById).toHaveBeenCalledWith('p2');
    expect(Race.aggregate).not.toHaveBeenCalled();
    expect(Profession.aggregate).not.toHaveBeenCalled();
    expect(saved.race).toBe('r2');
    expect(saved.profession).toBe('p2');
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
