import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/character").then(res => setCharacters(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center p-8 font-dnd text-white" style={{ backgroundImage: "url('/map-bg-CbQYZMul.jpg')" }}>
      <h1 className="text-3xl text-dndgold mb-6">Твої персонажі</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map(c => (
          <div key={c._id} className="bg-[#1c120a]/80 p-4 rounded-xl shadow-lg border border-dndgold">
            <h2 className="text-xl text-dndgold">{c.name}</h2>
            <p className="text-sm italic mb-2">{c.bio}</p>
            <p className="text-xs">Раса: {c.race?.name || "—"}</p>
            <p className="text-xs">Клас: {c.profession?.name || "—"}</p>
            <button
              onClick={() => navigate(`/lobby/${c._id}`)}
              className="mt-2 bg-red-800 hover:bg-red-700 text-white py-1 px-4 rounded transition"
            >
              Обрати
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}