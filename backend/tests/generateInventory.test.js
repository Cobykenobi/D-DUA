const generateInventory = require('../src/utils/generateInventory');

describe('generateInventory', () => {
  it('selects random items for each category', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0);

    const items = generateInventory('Orc', 'Warrior');
    Math.random.mockRestore();

    const names = items.map(i => i.item);
    expect(names).toEqual([
      'Меч',
      'Шкіряна броня',
      'Зілля здоров’я',
      'Кістяний талісман'
    ]);
  });

  it('mixes items across sets', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    const items = generateInventory('Orc', 'Warrior');
    Math.random.mockRestore();

    const names = items.map(i => i.item);
    expect(names).toEqual([
      'Сокира',
      'Щит',
      'Зілля здоров’я',
      'Кістяний талісман'
    ]);
  });

  it('returns empty array for unknown inputs', () => {
    const items = generateInventory('Unknown', 'Unknown');
    expect(items).toEqual([]);
  });
});
