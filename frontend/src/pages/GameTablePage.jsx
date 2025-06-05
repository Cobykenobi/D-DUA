import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GameTablePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchGames = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await axios.get(`${apiUrl}/api/games`);
        setGames(res.data);
      } catch (e) {}
    };
    fetchGames();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-2xl w-full flex flex-col items-center">
        <h1
          className="text-3xl text-dndgold mb-4"
          style={{ fontFamily: "IM Fell English SC, serif" }}
        >
          Ігровий стіл
        </h1>
        <ul>
          {games.map((game) => (
            <li key={game._id}>{game.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
