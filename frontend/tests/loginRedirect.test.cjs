/** @jest-environment node */
const getPostLoginRedirect = require('../src/utils/getPostLoginRedirect.cjs');

test('gm role redirects to gm dashboard', () => {
  expect(getPostLoginRedirect('gm')).toBe('/gm-dashboard');
  expect(getPostLoginRedirect('admin')).toBe('/gm-dashboard');
  expect(getPostLoginRedirect('player')).toBe('/characters');
});
