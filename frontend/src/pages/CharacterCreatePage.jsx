
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCharacter } from '../utils/api';
import api from '../api/axios';
import { getRandomElement } from '../utils/characterUtils';

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalRace = race || getRandomElement(raceOptions);
    const finalProfession = profession || getRandomElement(classOptions);
    let avatarUrl = '';
    try {
      const desc = `${gender} ${finalRace} ${finalProfession}`;
      const res = await api.post('/ai/avatar', { description: desc });
      avatarUrl = res.data?.url || '';
    } catch {
      avatarUrl = '';
    }

    const newChar = await createCharacter({
      name,
      gender,
      race: finalRace,
      profession: finalProfession,
      avatar: avatarUrl,

    });
    if (newChar && newChar._id) {
      navigate('/characters');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-dndbg bg-cover bg-center flex flex-col items-center justify-center p-6 font-dnd text-dndgold text-shadow"
      style={{ backgroundImage: "url('/map-bg.jpg')" }}
    >
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/characters')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          {t('back')}
        </button>
      </div>
      <h2 className="text-2xl mb-4">{t('create_character')}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300 w-64"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-64"
        >
          <option value="male">{t('gender.male')}</option>
          <option value="female">{t('gender.female')}</option>
        </select>

        <button
          type="submit"
          className="bg-dndgold text-dndred rounded-2xl px-4 py-2 font-semibold transition active:scale-95"
        >
          {t('create_character')}
        </button>
      </form>
    </div>
  );
};

export default CharacterCreatePage;
