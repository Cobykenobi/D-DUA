import api from '../../api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
export default function AdminRacesPage() {
  const [races, setRaces] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRaces = async () => {
    setLoading(true);
    const res = await api.get('/race');
    setRaces(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchRaces(); }, []);

  const addRace = async (e) => {
    e.preventDefault();
    await api.post('/race', { name, description });
    setName(''); setDescription(''); fetchRaces();
  };

  const removeRace = async (id) => {
    await api.delete(`/race/${id}`);
    fetchRaces();
  };

  const saveRace = async (id, raceData) => {
    await api.put(`/race/${id}`, raceData);
    fetchRaces();
  };

  const handleRaceChange = (id, field, value) => {
    setRaces(races => races.map(r => r._id === id ? { ...r, [field]: value } : r));
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
        {loading ? (
          <div className="text-center text-dndgold">Завантаження...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-dndgold divide-y divide-dndgold/20">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Назва</th>
                  <th className="py-2">Опис</th>
                  <th className="py-2 w-24">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dndgold/20">
                {races.map(race => (
                  <tr key={race._id} className="align-top">
                    <td className="py-1 pr-2">
                      <input
                        className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                        value={race.name}
                        onChange={e => handleRaceChange(race._id, 'name', e.target.value)}
                      />
                    </td>
                    <td className="py-1 pr-2">
                      <input
                        className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                        value={race.description || ''}
                        onChange={e => handleRaceChange(race._id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="py-1 flex gap-2">
                      <button
                        onClick={() => saveRace(race._id, { name: race.name, description: race.description })}
                        className="bg-dndgold text-dndred font-dnd rounded-2xl px-2 py-1"
                      >
                        Зберегти
                      </button>
                      <button
                        onClick={() => removeRace(race._id)}
                        className="text-dndred hover:underline"
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/master" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
