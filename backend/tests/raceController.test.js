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
      Race.findOne.mockResolvedValue(null);

      const req = { body: { name: 'Elf', code: 'elf', description: '', modifiers: { agility: 1 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.create(req, res);

      expect(Race).toHaveBeenCalledWith(
        expect.objectContaining({ modifiers: { agility: 1 } })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(instance);
    });

    it('derives code from name when missing', async () => {
      let instance;
      Race.mockImplementation(data => {
        instance = { save: jest.fn().mockResolvedValue(data) };
        return instance;
      });
      Race.findOne.mockResolvedValue(null);

      const req = { body: { name: 'Dark Elf', description: '', modifiers: {} } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.create(req, res);

      expect(Race).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'dark_elf' })
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('returns 400 when race already exists', async () => {
      Race.findOne.mockResolvedValue({ _id: 'r2' });

      const req = { body: { name: 'Elf', code: 'elf' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Race already exists' });
    });
  });

  describe('update', () => {
    it('updates modifiers field', async () => {
      Race.findOne.mockResolvedValue(null);
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

    it('derives code from name when missing', async () => {
      Race.findOne.mockResolvedValue(null);
      Race.findByIdAndUpdate.mockResolvedValue({ _id: 'r1' });

      const req = { params: { id: 'r1' }, body: { name: 'Dark Elf', description: '', modifiers: {} } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.update(req, res);

      expect(Race.findByIdAndUpdate).toHaveBeenCalledWith(
        'r1',
        { $set: { name: 'Dark Elf', code: 'dark_elf', description: '', modifiers: {} } },
        { new: true }
      );
    });

    it('returns 400 when race already exists', async () => {
      Race.findOne.mockResolvedValue({ _id: 'x' });

      const req = { params: { id: 'r1' }, body: { name: 'Elf', code: 'elf' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await raceController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Race already exists' });
    });
  });
});
