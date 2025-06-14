import api from '../../api/axios';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
export default function AdminMapsPage() {
  const [maps, setMaps] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();

  const fetchMaps = async () => {
    setLoading(true);
    const res = await api.get('/map');
    setMaps(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchMaps(); }, []);

  const addMap = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    await api.post('/map', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setName(''); setFile(null); fileInput.current.value = null; fetchMaps();
  };

  const removeMap = async (id) => {
    await api.delete(`/map/${id}`);
    fetchMaps();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Карти</h1>
        <form className="flex gap-2 mb-6 items-center" onSubmit={addMap}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Назва карти"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={e => setFile(e.target.files[0])}
            className="bg-[#2c1a12] border border-dndgold text-dndgold rounded-2xl px-2 py-1"
            required
          />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2">Додати</button>
        </form>
        {loading ? <div className="text-center text-dndgold">Завантаження...</div> : (
          <ul className="divide-y divide-dndgold/20 max-h-64 overflow-y-auto">
            {maps.map(map => (
              <li key={map._id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-dnd text-dndgold">{map.name}</div>
                  {map.image && <img src={map.image} alt="map" className="h-16 rounded-lg mt-1" />}
                </div>
                <button onClick={() => removeMap(map._id)} className="text-dndred hover:underline ml-2">Видалити</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
