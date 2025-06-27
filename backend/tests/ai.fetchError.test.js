jest.mock('node-fetch', () => jest.fn());

let generateCharacterImage;
let fetch;

describe('generateCharacterImage fetch failure', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.OPENAI_API_KEY = 'key';
    fetch = require('node-fetch');
    generateCharacterImage = require('../src/utils/ai').generateCharacterImage;
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    delete process.env.OPENAI_API_KEY;
  });

  it('resolves to empty string when fetch throws', async () => {
    fetch.mockRejectedValue(new Error('fail'));

    const result = await generateCharacterImage('elf', 'wizard', 'male');
    expect(result).toBe('');
  });
});
