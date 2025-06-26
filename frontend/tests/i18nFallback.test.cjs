/** @jest-environment node */

let en, ua, translateOrRaw;
beforeAll(async () => {
  ({ default: translateOrRaw } = await import('../src/utils/translateOrRaw'));
  ({ default: en } = await import('../src/locales/en.json', { assert: { type: 'json' } }));
  ({ default: ua } = await import('../src/locales/ua.json', { assert: { type: 'json' } }));
});

function makeT(data) {
  return (key) => key.split('.').reduce((o, p) => (o || {})[p], data) ?? key;
}

test('english missing key uses unknown translation', () => {
  const t = makeT(en);
  expect(translateOrRaw(t, 'stats.missing')).toBe(en.unknown);
});

test('ukrainian missing key uses unknown translation', () => {
  const t = makeT(ua);
  expect(translateOrRaw(t, 'stats.missing')).toBe(ua.unknown);
});
