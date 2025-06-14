const StartingSet = require('../src/models/StartingSet');
jest.mock('../src/models/StartingSet');

const generateInventory = require('../src/utils/generateInventory');

describe('generateInventory', () => {
  const sets = [
    { items: [ { name: 'Меч' }, { name: 'Щит' }, { name: 'Зілля здоров’я' } ] },
    { items: [ { name: 'Меч' }, { name: 'Шкіряна броня' }, { name: 'Зілля здоров’я' } ] },
    { items: [ { name: 'Сокира' }, { name: 'Щит' }, { name: 'Зілля здоров’я' } ] },
    { items: [ { name: 'Сокира' }, { name: 'Шкіряна броня' }, { name: 'Зілля здоров’я' } ] },
  ];

  it('selects random items for each category', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(sets) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = await generateInventory('orc_male', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Меч', amount: 1, bonus: {} },
      { item: 'Шкіряна броня', amount: 1, bonus: {} },
      { item: 'Зілля здоров’я', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', amount: 1, bonus: { strength: 1 } }
    ]);
  });

  it('mixes items across sets', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(sets) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);

    const items = await generateInventory('orc_female', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Сокира', amount: 1, bonus: {} },
      { item: 'Щит', amount: 1, bonus: {} },
      { item: 'Зілля здоров’я', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', amount: 1, bonus: { strength: 1 } }
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
