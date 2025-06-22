
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../../utils/api';

const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('human_male');
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
          <option value="human_male">Людина (чоловік)</option>
          <option value="human_female">Людина (жінка)</option>
          <option value="elf_male">Ельф (чоловік)</option>
          <option value="elf_female">Ельф (жінка)</option>
          <option value="orc_male">Орк (чоловік)</option>
          <option value="orc_female">Орк (жінка)</option>
          <option value="gnome_male">Гном (чоловік)</option>
          <option value="gnome_female">Гном (жінка)</option>
          <option value="dwarf_male">Дварф (чоловік)</option>
          <option value="dwarf_female">Дварф (жінка)</option>
        </select>
        <select value={profession} onChange={(e) => setProfession(e.target.value)}>
          <option value="warrior">Воїн</option>
          <option value="mage">Маг</option>
          <option value="archer">Лучник</option>
          <option value="paladin">Паладин</option>
          <option value="bard">Бард</option>
          <option value="healer">Цілитель</option>
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
