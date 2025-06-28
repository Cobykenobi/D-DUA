const StartingSet = require('../src/models/StartingSet');
const generateInventory = require('../src/utils/generateInventory');
const { raceInventory } = require('../src/data/staticInventoryTemplates');

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
      { item: 'DB Shield', code: 'db_shield', amount: 1, bonus: {} },
      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }

    ]);

  });

  it('falls back to static templates when DB has no set and selects random combo', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = await generateInventory('orc', 'archer');
    Math.random.mockRestore();


    expect(items).toEqual([
      { item: 'Довгий лук', code: 'довгий_лук', amount: 1, bonus: { agility: 2 } },
      { item: 'Шкіряна броня', code: 'шкіряна_броня', amount: 1, bonus: { agility: 1 } },
      { item: 'Колчан стріл', code: 'колчан_стріл', amount: 1, bonus: {} },

      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }

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
