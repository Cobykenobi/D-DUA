import api from "../api/axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import LogoutButton from "../components/LogoutButton";
import { getRaces, getProfessions } from '../utils/api';

export default function CharacterCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "" });
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

  const handleSubmit = async () => {
    try {
      if (!form.name) {
        setError("Будь ласка, заповніть ім'я персонажа.");
        return;
      }

      let payload;
      let headers;
      if (image) {
        payload = new FormData();
        payload.append('name', form.name);
        payload.append('image', image);
        headers = { 'Content-Type': 'multipart/form-data' };
      } else {
        payload = { name: form.name };
        headers = { 'Content-Type': 'application/json' };
      }
      await api.post("/character", payload, { headers });
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Помилка створення персонажа");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen font-dnd text-white bg-cover bg-center" style={{ backgroundImage: "url('/map-bg.jpg')" }}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => navigate('/profile')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          Назад
        </button>
        <LogoutButton />
      </div>
      <div className="bg-[#1c120a]/80 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl text-dndgold mb-6 text-center">Створення персонажа</h2>
        <label className="block text-sm mb-1">Ім’я</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          className="mb-4"
        />
        {races.length > 0 && (
          <div className="mb-2 text-sm text-dndgold">
            Доступні раси: {races.map(r => r.name).join(', ')}
          </div>
        )}
        {professions.length > 0 && (
          <div className="mb-4 text-sm text-dndgold">
            Доступні класи: {professions.map(p => p.name).join(', ')}
          </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-semibold transition active:scale-95"
        >
          Створити
        </button>
      </div>
    </div>
  );
}
