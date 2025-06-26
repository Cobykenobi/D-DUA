/** @jest-environment node */

let translateOrRaw;
beforeAll(async () => {
  ({ default: translateOrRaw } = await import('../src/utils/translateOrRaw'));
});

test('returns translated string when available', () => {
  const t = (k) => ({ 'stats.strength': 'Strength', unknown: 'Unknown' }[k] ?? k);
  expect(translateOrRaw(t, 'stats.strength')).toBe('Strength');
});

test('returns raw value when key missing and raw provided', () => {
  const t = (k) => ({ unknown: 'Unknown' }[k] ?? k);
  expect(translateOrRaw(t, 'stats.missing', 'RAW')).toBe('RAW');
});

test('returns unknown translation when key missing and no raw', () => {
  const t = (k) => ({ unknown: 'Unknown' }[k] ?? k);
  expect(translateOrRaw(t, 'stats.missing')).toBe('Unknown');
});
