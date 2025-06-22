
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../../utils/api';

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('wood_elf');
  const [profession, setProfession] = useState('warrior');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChar = await createCharacter({ name, description, gender, race, profession });
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
        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="wood_elf">Лісовий ельф</option>
          <option value="dark_elf">Темний ельф</option>
          <option value="human">Людина</option>
          <option value="halfling">Піврослик</option>
          <option value="lizardman">Ящеролюдина</option>
        </select>
        <select value={profession} onChange={(e) => setProfession(e.target.value)}>
          <option value="warrior">Воїн</option>
          <option value="paladin">Паладин</option>
          <option value="wizard">Маг</option>
          <option value="bard">Бард</option>
          <option value="assassin">Асасін</option>
        </select>
        <textarea
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Створити персонажа</button>
      </form>
    </div>
  );
};

export default CharacterCreatePage;
