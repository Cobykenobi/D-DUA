import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/user';
import { Link } from 'react-router-dom';

export default function CharactersPage() {
  const { user, token } = useUserStore();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    setLoading(true);
    const res = await axios.get('/api/characters/mine', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCharacters(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchCharacters(); }, []);

  const removeCharacter = async (id) => {
    if (!window.confirm('Видалити персонажа?')) return;
    await axios.delete(`/api/characters/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCharacters();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-2xl mt-10">
        <h1 className="font-dnd text-2xl text-dndgold mb-4 text-center">Мої персонажі</h1>
        <Link to="/characters/new" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 mb-4 block text-center hover:bg-dndred hover:text-white transition-all">+ Створити персонажа</Link>
        {loading ? <div className="text-center text-dndgold">Завантаження...</div> : (
          <ul className="divide-y divide-dndgold/20">
            {characters.map(ch => (
              <li key={ch._id} className="flex gap-4 py-3 items-center">
                {ch.image && <img src={ch.image} alt="avatar" className="w-14 h-14 rounded-xl object-cover" />}
                <div className="flex-1">
                  <div className="font-dnd text-dndgold text-lg">{ch.name}</div>
                  <div className="text-xs text-dndgold/80">{ch.race} / {ch.profession}</div>
                  {ch.description && <div className="text-xs text-dndgold/70 mt-1">{ch.description}</div>}
                </div>
                <Link to={`/characters/${ch._id}/edit`} className="text-dndgold underline">Редагувати</Link>
                <button onClick={() => removeCharacter(ch._id)} className="text-dndred underline">Видалити</button>
              </li>
            ))}
            {!characters.length && <li className="text-center text-dndgold/80 py-3">Персонажів ще немає.</li>}
          </ul>
        )}
        <Link to="/" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
