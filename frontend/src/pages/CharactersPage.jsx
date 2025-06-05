import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "https://d-dua.onrender.com/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

export default function CharactersPage() {
  const navigate = useNavigate();
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/characters")
      .then(res => setChars(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-3xl text-dndgold mb-4">Мої персонажі</h1>
        {loading ? (
          <div className="text-dndgold">Завантаження...</div>
        ) : chars.length === 0 ? (
          <div className="text-dndgold mb-4">У вас ще немає персонажів.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {chars.map(char => (
              <div key={char._id} className="bg-[#25160f]/80 rounded-2xl p-4 flex flex-col items-center">
                <img src={char.img} alt="" className="w-20 h-20 rounded-full border-2 border-dndgold bg-white mb-2" />
                <div className="text-dndgold text-lg mb-1">{char.name} ({char.race}, {char.class})</div>
                <div className="text-sm text-dndgold mb-2">{char.bio}</div>
                <button
                  className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-2 px-8 mt-2"
                  onClick={() => navigate(`/table?char=${char._id}`)}
                >
                  Грати
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
