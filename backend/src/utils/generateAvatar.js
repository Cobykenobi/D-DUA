const fs = require('fs');
const path = require('path');
const ai = require('./ai');

async function generateAvatar(gender, raceCode, classCode) {
  try {
    const avatarsDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'frontend',
      'public',
      'avatars'
    );

    const specific = `${gender}_${raceCode}_${classCode}.png`;
    const raceFile = `${gender}_${raceCode}.png`;

    if (fs.existsSync(path.join(avatarsDir, specific))) {
      return `/avatars/${specific}`;
    }

    if (fs.existsSync(path.join(avatarsDir, raceFile))) {
      return `/avatars/${raceFile}`;
    }

    if (process.env.OPENAI_API_KEY) {
      return await ai.generateCharacterImage(`${gender} ${raceCode} ${classCode}`);
    }

    const files = fs.readdirSync(avatarsDir).filter(f => !f.startsWith('.'));
    if (files.length === 0) return '';
    const file = files[Math.floor(Math.random() * files.length)];
    return `/avatars/${file}`;
  } catch {
    return '';
  }
}

module.exports = generateAvatar;
