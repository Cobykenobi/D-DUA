// Місце для інтеграції з AI для генерації картинки чи опису персонажа
// Працює через fetch або openai npm
// Потрібно додати API-ключ у .env

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

exports.generateCharacterImage = async (race, profession, gender) => {
  const prompt = `${gender} ${race} ${profession}`;
  // If no API key is provided, fall back to preset avatars bundled in the repo
  if (!process.env.OPENAI_API_KEY) {
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

  // Example integration with a remote AI service (e.g. DALL-E or Stable Diffusion)
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, n: 1, size: '512x512' }),
  });
  const data = await res.json();
  const url = data.data?.[0]?.url;
  if (!url) return '';

  // Download and persist the generated image
  const imgRes = await fetch(url);
  if (!imgRes.ok) return '';
  const buffer = await imgRes.buffer();
  const dir = path.join(__dirname, '..', '..', 'uploads', 'avatars');
  fs.mkdirSync(dir, { recursive: true });
  const filename = Date.now() + '.png';
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/uploads/avatars/${filename}`;
};
