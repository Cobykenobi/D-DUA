import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminProfessionsPage() {
  const { token } = useUserStore();
  const [professions, setProfessions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProfessions = async () => {
    setLoading(true);
    const res = await axios.get('/api/profession', { headers: { Authorization: `Bearer ${token}` } });
    setProfessions(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchProfessions(); }, []);

  const addProfession = async (e) => {
    e.preventDefault();
    await axios.post('/api/profession', { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setName(''); setDescription(''); fetchProfessions();
  };

  const removeProfession = async (id) => {
    await axios.delete(`/api/profession/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchProfessions();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Професії</h1>
        <form className="flex gap-2 mb-6" onSubmit={addProfession}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Назва професії"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Опис (необов'язково)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2">Додати</button>
        </form>
        {loading ? <div className="text-center text-dndgold">Завантаження...</div> : (
          <ul className="divide-y divide-dndgold/20">
            {professions.map(p => (
              <li key={p._id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-dnd text-dndgold">{p.name}</div>
                  {p.description && <div className="text-xs text-dndgold/80">{p.description}</div>}
                </div>
                <button onClick={() => removeProfession(p._id)} className="text-dndred hover:underline ml-2">Видалити</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
