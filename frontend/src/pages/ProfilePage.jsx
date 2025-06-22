
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import LanguageSwitch from '../components/LanguageSwitch';
import CharacterCard from '../components/CharacterCard';
import { getCharacters, deleteCharacter, updateCharacter } from '../utils/api';
import api from '../api/axios';
import { useUserStore } from '../store/user';

const ProfilePage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserStore();

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

  const handleSaveDescription = async (id, desc) => {
    const updated = await updateCharacter(id, { description: desc });
    setCharacters(prev => prev.map(c => c._id === id ? updated : c));
  };

  const openTable = (id) => {
    navigate(`/gm-table/${id}`);
    window.open(`/gm-control/${id}`, '_blank');
  };

  const createTable = async () => {
    try {
      const res = await api.post('/table');
      const { tableId } = res.data;
      openTable(tableId);
    } catch {
      // fail silently
    }
  };

  return (
    <div
      className="relative min-h-screen bg-dndbg bg-cover bg-center flex flex-col items-center p-6 font-dnd text-dndgold text-shadow"
      style={{ backgroundImage: "url('./map-bg.jpg')" }}
    >
      <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
        <button
          onClick={() => navigate('/login')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          Назад
        </button>
        <LogoutButton />
        <LanguageSwitch />
      </div>
      <h2 className="text-2xl mb-4 text-shadow">Твої персонажі</h2>
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleCreate}
          className="bg-dndgold text-dndred rounded-2xl px-4 py-2 font-semibold transition active:scale-95"
        >
          Створити нового
        </button>
        {user?.role === 'gm' && (
          <button
            onClick={createTable}
            className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-2xl px-4 py-2 font-semibold transition active:scale-95"
          >
            Створити стіл
          </button>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4 max-w-5xl overflow-y-auto">
        {characters.length === 0 ? (
          <div className="col-span-full text-center text-dndgold/80">
            Тут поки пусто. Створи першого героя!
          </div>
        ) : (
          characters.map((char) => (
            <CharacterCard
              key={char._id}
              character={char}
              editLabel="Увійти"
              onEdit={() => handleSelect(char._id)}
              onDelete={() => handleDelete(char._id)}
              onSaveDescription={handleSaveDescription}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
