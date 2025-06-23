const fs = require('fs');
const ai = require('../src/utils/ai');
const generateAvatar = require('../src/utils/generateAvatar');

describe('generateAvatar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.OPENAI_API_KEY;
  });

  it('returns specific avatar when file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(p =>
      p.endsWith('male_elf_mage.png')
    );

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path).toBe('/avatars/male_elf_mage.png');
  });

  it('returns race avatar when specific file missing', async () => {
    jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(p => p.endsWith('male_elf.png'));

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path).toBe('/avatars/male_elf.png');
  });

  it('uses AI when files missing and API key set', async () => {
    process.env.OPENAI_API_KEY = '1';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(ai, 'generateCharacterImage').mockResolvedValue('/avatars/ai.png');

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(ai.generateCharacterImage).toHaveBeenCalled();
    expect(path).toBe('/avatars/ai.png');
  });

  it('returns random avatar path when no files and no API key', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['a.png', 'b.png']);

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path.startsWith('/avatars/')).toBe(true);
  });

  it('returns empty string when avatar folder empty', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    const path = await generateAvatar('male', 'elf', 'mage');

    expect(path).toBe('');
  });
});
