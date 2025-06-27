const StartingSet = require('../src/models/StartingSet');
const generateInventory = require('../src/utils/generateInventory');

jest.mock('../src/models/StartingSet');

describe('generateInventory', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns items from the database when available', async () => {
    StartingSet.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        { items: [
            { name: 'DB Sword', code: 'db_sword', bonuses: new Map([['strength', 1]]) },
            { name: 'DB Shield', code: 'db_shield', bonuses: new Map() }
          ] }
      ])
    });

    const items = await generateInventory('orc', 'warrior');

    expect(items).toEqual([
      { item: 'DB Sword', code: 'db_sword', amount: 1, bonus: { strength: 1 } },
      { item: 'DB Shield', code: 'db_shield', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', code: 'кістяний_талісман', amount: 1, bonus: { strength: 1 } }
    ]);
  });

  it('falls back to static templates when DB has no set', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = await generateInventory('orc', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Меч', code: 'меч', amount: 1, bonus: { strength: 2 } },
      { item: 'Щит', code: 'щит', amount: 1, bonus: { defense: 1 } },
      { item: 'Зілля здоров’я', code: 'зілля_здоров’я', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', code: 'кістяний_талісман', amount: 1, bonus: { strength: 1 } }
    ]);
  });

  it('returns empty array for unknown inputs and logs warning', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const items = await generateInventory('unknown', 'unknown');

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
    expect(items).toEqual([]);
  });
});
