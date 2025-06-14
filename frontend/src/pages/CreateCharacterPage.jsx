
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../utils/api';
import { useToast } from '../context/ToastContext';

const CreateCharacterPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChar = await createCharacter({ name, description });
      if (newChar && newChar._id) {
        navigate('/lobby?char=' + newChar._id);
      }
    } catch (err) {
      showToast(err.message || 'Помилка створення персонажа', 'error');
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
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default CreateCharacterPage;
