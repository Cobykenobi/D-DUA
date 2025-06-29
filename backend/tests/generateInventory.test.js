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
        {
          items: [
            { name: 'DB Sword', code: 'db_sword', bonuses: new Map([['strength', 1]]) },
            { name: 'DB Shield', code: 'db_shield', bonuses: new Map() }
          ]
        }
      ])
    });

    const items = await generateInventory('orc', 'archer');


    expect(items).toEqual([
      { item: 'DB Sword', code: 'db_sword', amount: 1, bonus: { strength: 1 } },
      { item: 'DB Shield', code: 'db_shield', amount: 1, bonus: {} }

    ]);

  });

  it('falls back to static templates when DB has no set', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const items = await generateInventory('orc', 'archer');

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
    expect(items).toEqual([]);
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
