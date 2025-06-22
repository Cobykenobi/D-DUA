import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import LanguageSwitch from '../components/LanguageSwitch';
import { createCharacter } from '../utils/api';
import { useTranslation } from 'react-i18next';

export default function CharacterCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);


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
        };
      if (image) payload.image = image;
      await createCharacter(payload);
      navigate('/characters');
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
      <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
        <button
          onClick={() => navigate('/characters')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          Назад
        </button>
        <LogoutButton />
        <LanguageSwitch />
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
