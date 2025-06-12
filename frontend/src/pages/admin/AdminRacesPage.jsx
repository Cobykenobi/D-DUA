import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminRacesPage() {
  const { token } = useUserStore();
  const [races, setRaces] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRaces = async () => {
    setLoading(true);
    const res = await axios.get('/api/race', { headers: { Authorization: `Bearer ${token}` } });
    setRaces(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchRaces(); }, []);

  const addRace = async (e) => {
    e.preventDefault();
    await axios.post('/api/race', { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setName(''); setDescription(''); fetchRaces();
  };

  const removeRace = async (id) => {
    await axios.delete(`/api/race/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchRaces();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Раси</h1>
        <form className="flex gap-2 mb-6" onSubmit={addRace}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Назва раси"
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
            {races.map(race => (
              <li key={race._id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-dnd text-dndgold">{race.name}</div>
                  {race.description && <div className="text-xs text-dndgold/80">{race.description}</div>}
                </div>
                <button onClick={() => removeRace(race._id)} className="text-dndred hover:underline ml-2">Видалити</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
