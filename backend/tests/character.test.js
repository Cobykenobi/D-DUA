const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Character = require('../src/models/Character');
const StartingSet = require('../src/models/StartingSet');
const generateInventory = require('../src/utils/generateInventory');
const generateAvatar = require('../src/utils/generateAvatar');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Character');
jest.mock('../src/models/StartingSet');
jest.mock('../src/utils/generateInventory');
jest.mock('../src/utils/generateAvatar');

beforeEach(() => {
  jest.clearAllMocks();
  generateInventory.mockResolvedValue([]);
  generateAvatar.mockResolvedValue('/avatars/test.png');
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  Race.findOne.mockResolvedValue({ modifiers: new Map() });
  Profession.findOne.mockResolvedValue({ modifiers: new Map() });
  const q = Promise.resolve({ _id: 'c1', race: { name: 'Forest Elf', code: 'forest_elf' }, profession: { name: 'Wizard', code: 'wizard' } });
  q.populate = jest.fn().mockReturnValue(q);
  Character.findById = jest.fn(() => q);
});

afterEach(() => {
  console.warn.mockRestore();
});

describe('Character Controller - create', () => {
  it('applies race bonuses and class minimums', async () => {

    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Forest Elf', code: 'forest_elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', code: 'wizard' }]);
    Race.findOne.mockResolvedValue({ modifiers: new Map([['intellect', 1], ['agility', 2]]) });
    Profession.findOne.mockResolvedValue({ modifiers: new Map([['intellect', 2]]) });

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

    expect(saved.stats.intellect).toBe(8); // Mage intellect bonus applied
    expect(saved.stats.agility).toBe(7); // Elf agility bonus applied
    expect(saved.gender).toBe('male');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('defaults gender to male when not provided', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Орк', code: 'orc' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Warrior', code: 'warrior' }]);
    Race.findOne.mockResolvedValue({ modifiers: new Map([['health', 1], ['strength', 2]]) });
    Profession.findOne.mockResolvedValue({ modifiers: new Map([['defense', 1], ['strength', 2]]) });
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    jest.spyOn(Math, 'random').mockReturnValue(0);

    const req = { user: { id: 'u1' }, body: { name: 'Hero' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    Math.random.mockRestore();

    expect(saved.stats).toEqual({
      health: 6,
      defense: 6,
      strength: 9,
      intellect: 5,
      agility: 5,
      charisma: 5,
      mp: 5
    });
    expect(saved.gender).toBe('male');
  });

  it('passes codes to generateInventory and saves its result', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Forest Elf', code: 'forest_elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', code: 'wizard' }]);

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

    expect(generateInventory).toHaveBeenCalledWith('forest_elf', 'wizard');
    expect(saved.inventory).toEqual(inv);
    expect(saved.gender).toBe('male');
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

    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Forest Elf', code: 'forest_elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', code: 'wizard' }]);

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
    expect(saved.gender).toBe('male');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('generates avatar when none provided', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf', code: 'elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', code: 'wizard' }]);
    Race.findOne.mockResolvedValue({ modifiers: new Map() });
    Profession.findOne.mockResolvedValue({ modifiers: new Map([['intellect', 2]]) });
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });
    generateAvatar.mockResolvedValue('/avatars/x.png');

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = { user: { id: 'u1' }, body: { name: 'Hero' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(generateAvatar).toHaveBeenCalledWith('male', 'elf', 'wizard');
    expect(saved.image).toBe('/avatars/x.png');
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
    Profession.findById.mockResolvedValue({ _id: 'p2', name: 'Assassin', code: 'assassin' });

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
    expect(saved.gender).toBe('male');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('resolves race and profession codes to IDs', async () => {
    Race.findOne.mockResolvedValue({ _id: 'r3', name: 'Orc', code: 'orc' });
    Profession.findOne.mockResolvedValue({ _id: 'p3', name: 'Wizard', code: 'wizard' });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });


    const req = {
      user: { id: 'u1' },
      body: { name: 'Hero', race: 'orc', profession: 'mage' }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(Race.findOne).toHaveBeenCalledWith({ code: 'orc' });
    expect(Profession.findOne).toHaveBeenCalledWith({ code: 'wizard' });
    expect(Race.aggregate).not.toHaveBeenCalled();
    expect(Profession.aggregate).not.toHaveBeenCalled();
    expect(saved.race).toBe('r3');
    expect(saved.profession).toBe('p3');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('accepts class as an alias for profession', async () => {
    Race.findOne.mockResolvedValue({ _id: 'r4', name: 'Orc', code: 'orc' });
    Profession.findOne.mockResolvedValue({ _id: 'p4', name: 'Wizard', code: 'wizard' });

    let saved;
    Character.mockImplementation(data => {
      saved = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = {
      user: { id: 'u1' },
      body: { name: 'Hero', race: 'orc', class: 'wizard' }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(Profession.findOne).toHaveBeenCalledWith({ code: 'wizard' });
    expect(saved.profession).toBe('p4');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('returns 400 for invalid race code', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r99', name: 'Alien', code: 'alien' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard', code: 'wizard' }]);
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });

    const req = { user: { id: 'u1' }, body: { name: 'Hero' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid race' });
  });

  it('returns 400 for invalid class code', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Orc', code: 'orc' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p99', name: 'Pirate', code: 'pirate' }]);
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([{ items: [] }]) });

    const req = { user: { id: 'u1' }, body: { name: 'Hero' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid class' });
  });
});
