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

      const req = { body: { name: 'Mage', code: 'mage', description: '', modifiers: { intellect: 1 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.create(req, res);

      expect(Profession).toHaveBeenCalledWith(
        expect.objectContaining({ modifiers: { intellect: 1 } })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(instance);
    });
  });

  describe('update', () => {
    it('updates modifiers field', async () => {
      Profession.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', modifiers: { intellect: 2 } });

      const req = { params: { id: 'p1' }, body: { name: 'Mage', code: 'mage', description: '', modifiers: { intellect: 2 } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await professionController.update(req, res);

      expect(Profession.findByIdAndUpdate).toHaveBeenCalledWith(
        'p1',
        { $set: { name: 'Mage', code: 'mage', description: '', modifiers: { intellect: 2 } } },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith({ _id: 'p1', modifiers: { intellect: 2 } });
    });
  });
});
