// Місце для інтеграції з AI для генерації картинки чи опису персонажа
// Працює через fetch або openai npm
// Потрібно додати API-ключ у .env

const fetch = require('node-fetch');

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
  return data.data?.[0]?.url || '';
};

exports.generateCharacterDescription = async (params) => {
  // Можна підключити ChatGPT або інший сервіс
  // ...
  return 'Короткий опис персонажа з AI';
};
