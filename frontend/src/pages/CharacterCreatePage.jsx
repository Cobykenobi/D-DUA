import api from "../api/axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function CharacterCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", bio: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.bio) {
        setError("Будь ласка, заповніть всі поля.");
        return;
      }

      await api.post("/api/character", form);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Помилка створення персонажа");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-dnd text-white bg-cover bg-center" style={{ backgroundImage: "url('/map-bg.jpg')" }}>
      <div className="bg-[#1c120a]/80 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl text-dndgold mb-6 text-center">Створення персонажа</h2>
        <label className="block text-sm mb-1">Ім’я</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        />
        <label className="block text-sm mb-1">Біо</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2d1a10] border border-dndgold text-white"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          Створити
        </button>
      </div>
    </div>
  );
}