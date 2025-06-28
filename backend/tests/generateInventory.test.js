const StartingSet = require('../src/models/StartingSet');
const generateInventory = require('../src/utils/generateInventory');
const { raceInventory } = require('../src/data/staticInventoryTemplates');

jest.mock('../src/models/StartingSet');

describe('generateInventory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns items from static templates when DB has no set', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const items = await generateInventory('orc', 'archer');
    Math.random.mockRestore();
    const names = items.slice(0, 3).map(i => i.item);
    const combos = [
      ['Довгий лук', 'Шкіряна броня', 'Колчан стріл'],
      ['Довгий лук', 'Капюшон мисливця', 'Колчан стріл'],
      ['Арбалет', 'Шкіряна броня', 'Колчан стріл']
    ];
    expect(combos).toContainEqual(names);
    expect(items[3]).toEqual({
      item: raceInventory.orc[0].item,
      code: 'кістяний_талісман',
      amount: 1,
      bonus: raceInventory.orc[0].bonus
    });
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

    expect(items.some(i => i.item === 'DB Sword')).toBe(false);
    expect(items.some(i => i.item === 'DB Shield')).toBe(false);
    expect(items[items.length - 1]).toEqual({
      item: raceInventory.orc[0].item,
      code: 'кістяний_талісман',
      amount: 1,
      bonus: raceInventory.orc[0].bonus
    });
  });

  it('falls back to static templates when DB has no set and selects random combo', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = await generateInventory('orc', 'archer');
    Math.random.mockRestore();

    const names = items.slice(0, 3).map(i => i.item);
    expect(names).toEqual(['Довгий лук', 'Шкіряна броня', 'Колчан стріл']);
    expect(items[3]).toEqual({
      item: raceInventory.orc[0].item,
      code: 'кістяний_талісман',
      amount: 1,
      bonus: raceInventory.orc[0].bonus
    });
  });

  it('handles new races and classes', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0);
    const items = await generateInventory('halfling', 'rogue');
    Math.random.mockRestore();
    expect(items.length).toBeGreaterThan(0);
    expect(items[items.length - 1]).toEqual({
      item: raceInventory.halfling[0].item,
      code: 'карта_скарбів',
      amount: 1,
      bonus: raceInventory.halfling[0].bonus
    });
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
