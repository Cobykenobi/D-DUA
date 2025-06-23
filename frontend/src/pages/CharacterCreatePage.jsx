
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createCharacter } from '../utils/api';

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

        <button type="submit">{t('create_character')}</button>

      </form>
    </div>
  );
};

export default CharacterCreatePage;
