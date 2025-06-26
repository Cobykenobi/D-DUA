const generateInventory = require('../src/utils/generateInventory');

describe('generateInventory', () => {
  it('selects random items for each category', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = generateInventory('orc', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Меч', code: 'меч', amount: 1, bonus: { strength: 2 } },
      { item: 'Щит', code: 'щит', amount: 1, bonus: { defense: 1 } },
      { item: 'Зілля здоров’я', code: 'зілля_здоров’я', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', code: 'кістяний_талісман', amount: 1, bonus: { strength: 1 } }
    ]);
  });

  it('mixes items across sets', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);

    const items = generateInventory('orc', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Меч', code: 'меч', amount: 1, bonus: { strength: 2 } },
      { item: 'Шкіряна броня', code: 'шкіряна_броня', amount: 1, bonus: { agility: 1 } },
      { item: 'Зілля здоров’я', code: 'зілля_здоров’я', amount: 1, bonus: {} },
      { item: 'Кістяний талісман', code: 'кістяний_талісман', amount: 1, bonus: { strength: 1 } }
    ]);
  });

  it('returns empty array for unknown inputs and logs warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const items = generateInventory('unknown', 'unknown');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
    expect(items).toEqual([]);
  });
});
