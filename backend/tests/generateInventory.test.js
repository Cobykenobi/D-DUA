const generateInventory = require('../src/utils/generateInventory');

describe('generateInventory', () => {
  it('combines items from class and race', () => {
    const items = generateInventory('Orc', 'Warrior');
    const names = items.map(i => i.item);
    expect(names).toEqual([
      'Меч',
      'Щит',
      'Шкіряна броня',
      'Зілля здоров’я',
      'Кістяний талісман'
    ]);
  });

  it('returns empty array for unknown inputs', () => {
    const items = generateInventory('Unknown', 'Unknown');
    expect(items).toEqual([]);
  });
});
