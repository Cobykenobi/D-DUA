const fs = require('fs');
const generateAvatar = require('../src/utils/generateAvatar');

describe('generateAvatar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns random avatar path', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['a.png', 'b.png']);

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path.startsWith('/avatars/')).toBe(true);
  });

  it('returns empty string when no files', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path).toBe('');
  });
});
