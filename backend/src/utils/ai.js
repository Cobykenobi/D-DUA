// Місце для інтеграції з AI для генерації картинки чи опису персонажа
// Працює через fetch або openai npm
// Потрібно додати API-ключ у .env

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

exports.generateCharacterImage = async (description) => {
  // Приклад з DALL-E або Stable Diffusion (через proxy)
  // Тут лише шаблон
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: description, n: 1, size: '512x512' }),
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

exports.generateCharacterDescription = async (params) => {
  // Можна підключити ChatGPT або інший сервіс
  // ...
  return 'Короткий опис персонажа з AI';
};
