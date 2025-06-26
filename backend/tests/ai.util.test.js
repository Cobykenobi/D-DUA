const fs = require('fs');

const { generateCharacterImage } = require('../src/utils/ai');

describe('generateCharacterImage fallback', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns random avatar path', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['a.png', 'b.png']);

    const path = await generateCharacterImage('elf', 'wizard', 'male');

    expect(path.startsWith('/avatars/')).toBe(true);
  });

  it('returns empty string when no files', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    const path = await generateCharacterImage('elf', 'wizard', 'male');

    expect(path).toBe('');
  });
});
