
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../utils/api';

import { useToast } from '../context/ToastContext';

const CreateCharacterPage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('human_male');
  const [profession, setProfession] = useState('warrior');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChar = await createCharacter({ name, description, gender, race, profession });
      if (newChar && newChar._id) {
        navigate('/lobby?char=' + newChar._id);
      }
    } catch (err) {
      setError(err.message || 'Помилка створення персонажа');
    }
  };

  return (
    <div>
      <h2>Створення персонажа</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім’я персонажа"
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
          placeholder="Опис персонажа"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Створити</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateCharacterPage;
