const fs = require('fs');
const path = require('path');

async function generateAvatar(gender, raceCode, classCode) {
  try {
    const avatarsDir = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'avatars');
    const files = fs.readdirSync(avatarsDir).filter(f => !f.startsWith('.'));
    if (files.length === 0) return '';
    const file = files[Math.floor(Math.random() * files.length)];
    return `/avatars/${file}`;
  } catch {
    return '';
  }
}

module.exports = generateAvatar;
