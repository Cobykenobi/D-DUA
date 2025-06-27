const professionController = require('../src/controllers/professionController');
const Profession = require('../src/models/Profession');

jest.mock('../src/models/Profession');

describe('Profession Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('saves modifiers from body', async () => {
      let instance;
      Profession.mockImplementation(data => {
        instance = { save: jest.fn().mockResolvedValue(data) };
        return instance;
      });
      Profession.findOne.mockResolvedValue(null);

      const req = { body: { name: 'Wizard', code: 'wizard', description: '', modifiers: { intellect: 1 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.create(req, res);

      expect(Profession).toHaveBeenCalledWith(
        expect.objectContaining({ modifiers: { intellect: 1 } })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(instance);
    });

    it('derives code from name when missing', async () => {
      let instance;
      Profession.mockImplementation(data => {
        instance = { save: jest.fn().mockResolvedValue(data) };
        return instance;
      });
      Profession.findOne.mockResolvedValue(null);

      const req = { body: { name: 'High Wizard', description: '', modifiers: {} } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.create(req, res);

      expect(Profession).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'high_wizard' })
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('returns 400 when profession already exists', async () => {
      Profession.findOne.mockResolvedValue({ _id: 'p2' });

      const req = { body: { name: 'Wizard', code: 'wizard' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Profession already exists' });
    });
  });

  describe('update', () => {
    it('updates modifiers field', async () => {
      Profession.findOne.mockResolvedValue(null);
      Profession.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', modifiers: { intellect: 2 } });

      const req = { params: { id: 'p1' }, body: { name: 'Wizard', code: 'wizard', description: '', modifiers: { intellect: 2 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.update(req, res);

      expect(Profession.findByIdAndUpdate).toHaveBeenCalledWith(
        'p1',
        { $set: { name: 'Wizard', code: 'wizard', description: '', modifiers: { intellect: 2 } } },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith({ _id: 'p1', modifiers: { intellect: 2 } });
    });

    it('derives code from name when missing', async () => {
      Profession.findOne.mockResolvedValue(null);
      Profession.findByIdAndUpdate.mockResolvedValue({ _id: 'p1' });

      const req = { params: { id: 'p1' }, body: { name: 'High Wizard', description: '', modifiers: {} } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.update(req, res);

      expect(Profession.findByIdAndUpdate).toHaveBeenCalledWith(
        'p1',
        { $set: { name: 'High Wizard', code: 'high_wizard', description: '', modifiers: {} } },
        { new: true }
      );
    });

    it('returns 400 when profession already exists', async () => {
      Profession.findOne.mockResolvedValue({ _id: 'other' });

      const req = { params: { id: 'p1' }, body: { name: 'Wizard', code: 'wizard' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Profession already exists' });
    });
  });
});
