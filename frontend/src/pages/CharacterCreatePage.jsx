
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCharacter, getRaces, getProfessions } from '../utils/api';
import api from '../api/axios';
import { getRandomElement } from '../utils/characterUtils';
import translateOrRaw from '../utils/translateOrRaw';

import { useAppearance } from '../context/AppearanceContext';


const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('');
  const [profession, setProfession] = useState('');
  const [raceOptions, setRaceOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const races = await getRaces();
        setRaceOptions(races);
      } catch {
        setRaceOptions([]);
      }
      try {
        const professions = await getProfessions();
        setClassOptions(professions);
      } catch {
        setClassOptions([]);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalRace = race || (getRandomElement(raceOptions) || {}).code;
    const finalProfession = profession || (getRandomElement(classOptions) || {}).code;
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
      class: finalProfession,
      avatar: avatarUrl,

    });
    if (newChar && newChar._id) {
      navigate('/characters');
    }
  };

  const { background } = useAppearance();
  return (
    <div
      className="relative min-h-screen bg-dndbg bg-cover bg-center flex flex-col items-center justify-center p-6 font-dnd text-dndgold text-shadow"
      style={{ backgroundImage: `url('${background}')` }}
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

        <select
          value={race}
          onChange={(e) => setRace(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-64"
        >
          <option value="">{t('random')}</option>
          {raceOptions.map((r) => (
            <option key={r._id} value={r.code}>
              {translateOrRaw(t, `races.${r.code.toLowerCase()}`, r.name)}
            </option>
          ))}
        </select>

        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-64"
        >
          <option value="">{t('random')}</option>
          {classOptions.map((c) => (
            <option key={c._id} value={c.code}>
              {translateOrRaw(t, `classes.${c.code.toLowerCase()}`, c.name)}
            </option>
          ))}
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
