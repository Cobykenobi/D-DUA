import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const races = ["Людина", "Ельф", "Дворф", "Гном", "Орк", "Тіфлінг", "Драконороджений"];
const classes = ["Воїн", "Маг", "Розвідник", "Жрець", "Паладин", "Бард", "Плут"];
const statsList = ["Сила", "Спритність", "Витривалість", "Інтелект", "Мудрість", "Харизма"];
const inventoryItems = ["Меч", "Спис", "Плащ", "Ліхтар", "Мішок", "Лікувальне зілля", "Книга заклять"];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomStats() {
  return Object.fromEntries(statsList.map(stat => [stat, Math.floor(6 + Math.random() * 13)]));
}
function getRandomInventory() {
  const count = 3 + Math.floor(Math.random() * 3);
  let arr = [];
  while (arr.length < count) {
    const item = getRandomElement(inventoryItems);
    if (!arr.includes(item)) arr.push(item);
  }
  return arr;
}

const api = axios.create({
  baseURL: "https://d-dua.onrender.com/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [char, setChar] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const race = getRandomElement(races);
      const charClass = getRandomElement(classes);
      const stats = getRandomStats();
      const inventory = getRandomInventory();
      const imgUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name || race+charClass)}`;

      const res = await api.post("/characters", {
        name,
        bio,
        race,
        class: charClass,
        stats,
        inventory,
        img: imgUrl,
      });

      setChar(res.data);
    } catch (err) {
      setError("Помилка створення персонажа");
    }
    setLoading(false);
  };

  if (char)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl text-dndgold mb-4">Персонаж створений!</h1>
          <img src={char.img} alt="" className="w-32 h-32 mb-2 rounded-full border-2 border-dndgold bg-white" />
          <div className="text-dndgold text-lg mb-2">{char.name} ({char.race}, {char.class})</div>
          <button
            onClick={() => navigate('/characters')}
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-2 px-8 mt-4"
          >
            До списку персонажів
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl text-dndgold mb-4">Створити персонажа</h1>
        <form onSubmit={handleCreate} className="w-full flex flex-col gap-4">
          <input
            type="text"
            required
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Ім'я персонажа"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Коротка передісторія"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            disabled={loading}
            type="submit"
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-2 px-8"
          >
            {loading ? "Генерація..." : "Створити"}
          </button>
        </form>
      </div>
    </div>
  );
}
