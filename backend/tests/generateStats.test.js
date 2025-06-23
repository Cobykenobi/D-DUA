const Race = require('../src/models/Race');
const Profession = require('../src/models/Profession');

jest.mock('../src/models/Race');
jest.mock('../src/models/Profession');

const generateStats = require('../src/utils/generateStats');

describe('generateStats', () => {
  it('applies race and class bonuses', async () => {
    Race.findOne.mockResolvedValue({ modifiers: new Map([['strength', 2], ['health', 1]]) });
    Profession.findOne.mockResolvedValue({ modifiers: new Map([['strength', 2], ['defense', 1]]) });

    jest.spyOn(Math, 'random').mockReturnValue(0);
    const stats = await generateStats('orc_male', 'warrior');
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
