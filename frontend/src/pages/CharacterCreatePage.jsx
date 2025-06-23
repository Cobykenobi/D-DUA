
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCharacter } from '../utils/api';
import translateOrRaw from '../utils/translateOrRaw.js';

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChar = await createCharacter({ name, gender });
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
          placeholder="Ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">{t('gender.male')}</option>
          <option value="female">{t('gender.female')}</option>
        </select>

        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="wood_elf">
            {translateOrRaw(t, 'races.wood_elf', 'Лісовий ельф')}
          </option>
          <option value="dark_elf">
            {translateOrRaw(t, 'races.dark_elf', 'Темний ельф')}
          </option>
          <option value="human">
            {translateOrRaw(t, 'races.human', 'Людина')}
          </option>
          <option value="halfling">
            {translateOrRaw(t, 'races.halfling', 'Піврослик')}
          </option>
          <option value="lizardman">
            {translateOrRaw(t, 'races.lizardman', 'Ящеролюдина')}
          </option>
        </select>
        <select value={profession} onChange={(e) => setProfession(e.target.value)}>
          <option value="warrior">
            {translateOrRaw(t, 'classes.warrior', 'Воїн')}
          </option>
          <option value="paladin">
            {translateOrRaw(t, 'classes.paladin', 'Паладин')}
          </option>
          <option value="wizard">
            {translateOrRaw(t, 'classes.wizard', 'Маг')}
          </option>
          <option value="bard">{translateOrRaw(t, 'classes.bard', 'Бард')}</option>
          <option value="assassin">
            {translateOrRaw(t, 'classes.assassin', 'Асасін')}
          </option>
        </select>
        <textarea
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{t('create_character')}</button>

      </form>
    </div>
  );
};

export default CharacterCreatePage;
