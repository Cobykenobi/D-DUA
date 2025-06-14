import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../utils/api';

const CreateCharacterPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChar = await createCharacter({ name, description });
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
          required
        />
        <textarea
          placeholder="Опис або історія"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default CreateCharacterPage;