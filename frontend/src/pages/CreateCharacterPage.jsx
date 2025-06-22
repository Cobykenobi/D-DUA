
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../utils/api';

import { useToast } from '../context/ToastContext';

const CreateCharacterPage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [race, setRace] = useState('wood_elf');
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
