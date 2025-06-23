
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../utils/api';

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChar = await createCharacter({ name, gender });
    if (newChar && newChar._id) {
      navigate('/lobby?char=' + newChar._id);
    }
  };

  return (
    <div className="character-create-page">
      <h2>Створити персонажа</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Чоловік</option>
          <option value="female">Жінка</option>
        </select>
        {/* Only name and gender are required for character creation */}
        <button type="submit">Створити персонажа</button>
      </form>
    </div>
  );
};

export default CharacterCreatePage;
