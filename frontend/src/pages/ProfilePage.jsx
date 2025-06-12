
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getCharacters, deleteCharacter } from '../utils/api'

const ProfilePage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCharacters().then(setCharacters);
  }, []);

  const handleCreate = () => navigate('/create-character');
  const handleSelect = (charId) => navigate(`/lobby?char=${charId}`);
  const handleDelete = async (id) => {
    await deleteCharacter(id);
    setCharacters((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h2>Твої персонажі</h2>
      <button onClick={handleCreate}>Створити нового</button>
      <ul>
        {characters.map((char) => (
          <li key={char._id}>
            <strong>{char.name}</strong> ({char.race?.name} / {char.profession?.name})
            <button onClick={() => handleSelect(char._id)}>Увійти</button>
            <button onClick={() => handleDelete(char._id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
