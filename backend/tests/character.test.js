const characterController = require('../src/controllers/characterController');
const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');
const Characteristic = require('../src/models/Characteristic');
const Character = require('../src/models/Character');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');
jest.mock('../src/models/Characteristic');
jest.mock('../src/models/Character');

describe('Character Controller - create', () => {
  it('populates inventory and validates wizard hp range', async () => {
    Race.aggregate.mockResolvedValue([{ _id: 'r1', name: 'Elf' }]);
    Profession.aggregate.mockResolvedValue([{ _id: 'p1', name: 'Wizard' }]);
    Characteristic.find.mockResolvedValue([
      { _id: 'c1', name: 'hp' },
      { _id: 'c2', name: 'mp' },
    ]);
    let savedData;
    Character.mockImplementation(data => {
      savedData = data;
      return { save: jest.fn().mockResolvedValue(data) };
    });

    const req = { user: { id: 'u1' }, body: { name: 'Hero', description: '', image: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await characterController.create(req, res);

    expect(savedData.inventory.length).toBeGreaterThanOrEqual(2);
    const hp = savedData.stats.find(s => s.characteristic === 'c1').value;
    expect(hp).toBeGreaterThanOrEqual(6);
    expect(hp).toBeLessThanOrEqual(10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
