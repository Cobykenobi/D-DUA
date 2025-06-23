const raceController = require('../src/controllers/raceController');
const Race = require('../src/models/Race');

jest.mock('../src/models/Race');

describe('Race Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('saves modifiers from body', async () => {
      let instance;
      Race.mockImplementation(data => {
        instance = { save: jest.fn().mockResolvedValue(data) };
        return instance;
      });

      const req = { body: { name: 'Elf', code: 'elf', description: '', modifiers: { agility: 1 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.create(req, res);

      expect(Race).toHaveBeenCalledWith(
        expect.objectContaining({ modifiers: { agility: 1 } })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(instance);
    });
  });

  describe('update', () => {
    it('updates modifiers field', async () => {
      Race.findByIdAndUpdate.mockResolvedValue({ _id: 'r1', modifiers: { agility: 2 } });

      const req = { params: { id: 'r1' }, body: { name: 'Elf', code: 'elf', description: '', modifiers: { agility: 2 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.update(req, res);

      expect(Race.findByIdAndUpdate).toHaveBeenCalledWith(
        'r1',
        { $set: { name: 'Elf', code: 'elf', description: '', modifiers: { agility: 2 } } },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith({ _id: 'r1', modifiers: { agility: 2 } });
    });
  });
});
