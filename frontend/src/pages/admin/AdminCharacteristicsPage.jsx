import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../../store/user';
import { Link } from 'react-router-dom';

export default function AdminCharacteristicsPage() {
  const { token } = useUserStore();
  const [characteristics, setCharacteristics] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCharacteristics = async () => {
    setLoading(true);
    const res = await axios.get('/api/characteristics', { headers: { Authorization: `Bearer ${token}` } });
    setCharacteristics(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchCharacteristics(); }, []);

  const addCharacteristic = async (e) => {
    e.preventDefault();
    await axios.post('/api/characteristics', { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setName(''); setDescription(''); fetchCharacteristics();
  };

  const removeCharacteristic = async (id) => {
    await axios.delete(`/api/characteristics/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCharacteristics();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Характеристики</h1>
        <form className="flex gap-2 mb-6" onSubmit={addCharacteristic}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Назва характеристики"
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
            {characteristics.map(ch => (
              <li key={ch._id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-dnd text-dndgold">{ch.name}</div>
                  {ch.description && <div className="text-xs text-dndgold/80">{ch.description}</div>}
                </div>
                <button onClick={() => removeCharacteristic(ch._id)} className="text-dndred hover:underline ml-2">Видалити</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
