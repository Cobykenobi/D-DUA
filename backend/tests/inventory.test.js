const inventoryController = require('../src/controllers/inventoryController');
const Inventory = require('../src/models/Inventory');
const Character = require('../src/models/Character');

jest.mock('../src/models/Inventory');
jest.mock('../src/models/Character');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Inventory Controller - update', () => {
  it('allows owner to update inventory', async () => {
    Character.findOne.mockResolvedValue({ _id: 'c1', user: 'u1' });
    Inventory.findOneAndUpdate.mockResolvedValue({ items: [{ item: 'Sword' }] });

    const req = {
      params: { characterId: 'c1' },
      body: { items: [{ item: 'Sword' }] },
      user: { id: 'u1', role: 'player' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await inventoryController.update(req, res);

    expect(Inventory.findOneAndUpdate).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      items: [
        { item: 'Sword', code: 'sword', amount: undefined, description: undefined, bonus: {} }
      ]
    });
  });

  it('allows admin to update inventory without ownership', async () => {
    Inventory.findOneAndUpdate.mockResolvedValue({ items: [] });

    const req = {
      params: { characterId: 'c1' },
      body: { items: [] },
      user: { id: 'admin', role: 'admin' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await inventoryController.update(req, res);

    expect(Character.findOne).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('returns 403 when user lacks permission', async () => {
    Character.findOne.mockResolvedValue(null);

    const req = {
      params: { characterId: 'c1' },
      body: { items: [] },
      user: { id: 'u2', role: 'player' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await inventoryController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(Inventory.findOneAndUpdate).not.toHaveBeenCalled();
  });
});
