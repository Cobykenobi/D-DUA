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

    const items = await generateInventory('Orc', 'Warrior');
    Math.random.mockRestore();

    const names = items.map(i => i.item);
    expect(names).toEqual([
      'Меч',
      'Шкіряна броня',
      'Зілля здоров’я',
      'Кістяний талісман'
    ]);
  });

  it('mixes items across sets', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(sets) });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);

    const items = await generateInventory('Orc', 'Warrior');
    Math.random.mockRestore();

    const names = items.map(i => i.item);
    expect(names).toEqual([
      'Сокира',
      'Щит',
      'Зілля здоров’я',
      'Кістяний талісман'
    ]);
  });

  it('returns empty array for unknown inputs', async () => {
    StartingSet.find.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    const items = await generateInventory('Unknown', 'Unknown');
    expect(items).toEqual([]);
  });
});
