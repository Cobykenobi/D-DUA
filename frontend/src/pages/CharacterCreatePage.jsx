import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import { createCharacter, getRaces, getProfessions } from '../utils/api';

export default function CharacterCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', race: '', profession: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [races, setRaces] = useState([]);
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    getRaces().then(setRaces).catch(() => {});
    getProfessions().then(setProfessions).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name) {
        setError("Будь ласка, заповніть ім'я персонажа.");
        return;
      }
      const payload = {
        name: form.name,
        raceId: form.race,
        professionId: form.profession,
      };
      if (image) payload.image = image;
      await createCharacter(payload);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Помилка створення персонажа');
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen font-dnd text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/map-bg.jpg')" }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => navigate('/profile')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          Назад
        </button>
        <LogoutButton />
      </div>
      <form onSubmit={handleSubmit} className="bg-[#1c120a]/80 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl text-dndgold mb-6 text-center">Створення персонажа</h2>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <label className="block text-sm mb-1">Ім’я</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        />
        <label className="block text-sm mb-1">Раса</label>
        <select
          name="race"
          value={form.race}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        >
          <option value="">Оберіть расу</option>
          {races.map((r) => (
            <option key={r._id || r.id || r.code} value={r._id || r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <label className="block text-sm mb-1">Клас</label>
        <select
          name="profession"
          value={form.profession}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        >
          <option value="">Оберіть клас</option>
          {professions.map((p) => (
            <option key={p._id || p.id || p.code} value={p._id || p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <label className="block text-sm mb-1">Зображення</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="w-full bg-dndgold text-dndred hover:bg-dndred hover:text-white font-dnd rounded-2xl py-2 transition active:scale-95"
        >
          Створити
        </button>
      </form>
    </div>
  );
}
