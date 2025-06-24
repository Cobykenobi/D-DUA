
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCharacter } from '../utils/api';
import { getRandomElement } from '../utils/characterUtils';

const raceOptions = ['human', 'forest_elf', 'dark_elf', 'gnome', 'dwarf', 'orc'];
const classOptions = ['warrior', 'wizard', 'assassin', 'paladin', 'bard'];

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('');
  const [profession, setProfession] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalRace = race || getRandomElement(raceOptions);
    const finalProfession = profession || getRandomElement(classOptions);
    const newChar = await createCharacter({
      name,
      gender,
      race: finalRace,
      profession: finalProfession,
    });
    if (newChar && newChar._id) {
      navigate('/lobby?char=' + newChar._id);
    }
  };

  return (
    <div className="character-create-page">
      <h2>{t('create_character')}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">{t('gender.male')}</option>
          <option value="female">{t('gender.female')}</option>
        </select>
        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="">{t('random') || 'Random'}</option>
          {raceOptions.map((r) => {
            const key = r === 'forest_elf' ? 'wood_elf' : r;
            return (
              <option key={r} value={r}>
                {t(`races.${key}`, r)}
              </option>
            );
          })
        </select>
        <select value={profession} onChange={(e) => setProfession(e.target.value)}>
          <option value="">{t('random') || 'Random'}</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {t(`classes.${c}`, c)}
            </option>
          ))}
        </select>

        <button type="submit">{t('create_character')}</button>

      </form>
    </div>
  );
};

export default CharacterCreatePage;
