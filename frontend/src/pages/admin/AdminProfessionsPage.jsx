import api from '../../api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
export default function AdminProfessionsPage() {
  const [professions, setProfessions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProfessions = async () => {
    setLoading(true);
    const res = await api.get('/profession');
    setProfessions(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchProfessions(); }, []);

  const addProfession = async (e) => {
    e.preventDefault();
    await api.post('/profession', { name, description });
    setName(''); setDescription(''); fetchProfessions();
  };

  const removeProfession = async (id) => {
    await api.delete(`/profession/${id}`);
    fetchProfessions();
  };

  const saveProfession = async (id, data) => {
    await api.put(`/profession/${id}`, data);
    fetchProfessions();
  };

  const handleProfessionChange = (id, field, value) => {
    setProfessions(profs => profs.map(p => p._id === id ? { ...p, [field]: value } : p));
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
                {professions.map(p => (
                  <tr key={p._id} className="align-top">
                    <td className="py-1 pr-2">
                      <input
                        className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                        value={p.name}
                        onChange={e => handleProfessionChange(p._id, 'name', e.target.value)}
                      />
                    </td>
                    <td className="py-1 pr-2">
                      <input
                        className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                        value={p.description || ''}
                        onChange={e => handleProfessionChange(p._id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="py-1 flex gap-2">
                      <button
                        onClick={() => saveProfession(p._id, { name: p.name, description: p.description })}
                        className="bg-dndgold text-dndred font-dnd rounded-2xl px-2 py-1"
                      >
                        Зберегти
                      </button>
                      <button
                        onClick={() => removeProfession(p._id)}
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
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
