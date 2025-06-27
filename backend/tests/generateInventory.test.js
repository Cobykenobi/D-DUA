const generateInventory = require('../src/utils/generateInventory');
const { raceInventory } = require('../src/data/staticInventoryTemplates');

describe('generateInventory', () => {
  it('selects random items for each category', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = generateInventory('orc', 'warrior');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Меч', code: 'меч', amount: 1, bonus: { strength: 2 } },
      { item: 'Щит', code: 'щит', amount: 1, bonus: { defense: 1 } },
      { item: 'Зілля здоров’я', code: 'зілля_здоров’я', amount: 1, bonus: {} },
      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }
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
      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }
    ]);
  });

  it('generates inventory for archer', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = generateInventory('orc', 'archer');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Довгий лук', code: 'довгий_лук', amount: 1, bonus: { agility: 2 } },
      { item: 'Шкіряна броня', code: 'шкіряна_броня', amount: 1, bonus: { agility: 1 } },
      { item: 'Колчан стріл', code: 'колчан_стріл', amount: 1, bonus: {} },
      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }
    ]);
  });

  it('generates inventory for healer', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const items = generateInventory('orc', 'healer');
    Math.random.mockRestore();

    expect(items).toEqual([
      { item: 'Жезл зцілення', code: 'жезл_зцілення', amount: 1, bonus: { intellect: 1 } },
      { item: 'Ряса', code: 'ряса', amount: 1, bonus: { health: 1 } },
      { item: 'Зілля лікування', code: 'зілля_лікування', amount: 1, bonus: {} },
      { item: raceInventory.orc[0].item, code: 'кістяний_талісман', amount: 1, bonus: raceInventory.orc[0].bonus }
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
