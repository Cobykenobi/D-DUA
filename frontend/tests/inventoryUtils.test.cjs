/** @jest-environment node */

test('normalizeInventory handles array', async () => {
  const { normalizeInventory } = await import('../src/utils/inventoryUtils.js');
  const result = normalizeInventory(['a', 'b']);
  expect(result).toEqual({ type: 'array', items: ['a', 'b'] });
});

test('normalizeInventory handles object', async () => {
  const { normalizeInventory } = await import('../src/utils/inventoryUtils.js');
  const input = { one: { item: 'sword' }, two: { item: 'shield' } };
  const result = normalizeInventory(input);
  expect(result).toEqual({ type: 'object', items: [['one', input.one], ['two', input.two]] });
});

test('normalizeInventory handles invalid', async () => {
  const { normalizeInventory } = await import('../src/utils/inventoryUtils.js');
  const result = normalizeInventory(null);
  expect(result).toEqual({ type: 'empty', items: [] });
});
