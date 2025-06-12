import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const races = ['Людина', 'Ельф', 'Гном', 'Орк', 'Драконіт'];
const professions = ['Воїн', 'Маг', 'Крадій', 'Священик', 'Бард'];
const inventoryItems = ['Меч', 'Плащ', 'Зілля', 'Книга', 'Ключ'];

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomStats() {
  return {
    strength: Math.floor(Math.random() * 20) + 1,
    agility: Math.floor(Math.random() * 20) + 1,
    intelligence: Math.floor(Math.random() * 20) + 1,
    charisma: Math.floor(Math.random() * 20) + 1,
    luck: Math.floor(Math.random() * 20) + 1,
  };
}

export default function CharacterCreatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    const newCharacter = {
      name,
      description,
      race: getRandomFromArray(races),
      profession: getRandomFromArray(professions),
      inventory: [getRandomFromArray(inventoryItems)],
      characteristics: getRandomStats(),
    };

    try {
      await api.post('/characters', newCharacter);
      navigate('/profile');
    } catch (error) {
      console.error('Помилка при створенні персонажа:', error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Створення персонажа</h1>
      <input
        className="w-full p-2 mb-2 text-black"
        placeholder="Ім’я персонажа"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2 text-black"
        placeholder="Опис персонажа"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
      >
        Створити
      </button>
    </div>
  );
}