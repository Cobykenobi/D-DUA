
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { getCharacters, deleteCharacter } from '../utils/api';

const ProfilePage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setCharacters([]);
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      }
    };
    fetchChars();
  }, []);

  const handleCreate = () => navigate('/create-character');
  const handleSelect = (charId) => navigate(`/lobby?char=${charId}`);
  const handleDelete = async (id) => {
    await deleteCharacter(id);
    setCharacters((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div
      className="relative min-h-screen bg-dndbg bg-cover bg-center flex flex-col items-center p-6 font-dnd text-dndgold"
      style={{ backgroundImage: "url('/map-bg.jpg')" }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => navigate('/login')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition"
        >
          Назад
        </button>
        <LogoutButton />
      </div>
      <h2 className="text-2xl mb-4">Твої персонажі</h2>
      <button
        onClick={handleCreate}
        className="bg-dndgold text-dndred rounded-2xl px-4 py-2 font-semibold mb-6"
      >
        Створити нового
      </button>
      <ul className="w-full max-w-xl space-y-3">
        {characters.length === 0 ? (
          <li className="text-center text-dndgold/80">Тут поки пусто. Створи першого героя!</li>
        ) : (
          characters.map((char) => (
            <li
              key={char._id}
              className="bg-[#2d1a10]/80 p-4 rounded-xl flex justify-between items-center"
            >
              <span>
                <strong>{char.name}</strong> ({char.race?.name} / {char.profession?.name})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelect(char._id)}
                  className="bg-dndgold text-dndred rounded px-3 py-1"
                >
                  Увійти
                </button>
                <button
                  onClick={() => handleDelete(char._id)}
                  className="bg-dndred text-white rounded px-3 py-1"
                >
                  Видалити
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProfilePage;
