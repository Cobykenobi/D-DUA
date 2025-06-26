const generateStats = require('../src/utils/generateStats');

describe('generateStats', () => {
  it('applies race and class bonuses', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const stats = generateStats('orc_male', 'warrior');
    Math.random.mockRestore();
    expect(stats).toEqual({
      health: 6,
      defense: 6,
      strength: 9,
      intellect: 5,
      agility: 5,
      charisma: 5,
      mp: 5
    });
  });
});
