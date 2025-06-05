import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import axios from "axios";

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("/api/characters")
      .then(res => setCharacters(res.data))
      .catch(() => setCharacters([]));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 rounded-2xl p-8">
        <div className="text-dndgold text-2xl font-bold text-center mb-6">Мої персонажі</div>
        <div className="flex flex-wrap gap-6 justify-center">
          {characters.map(char => (
            <PlayerCard key={char._id} player={char} />
          ))}
        </div>
      </div>
    </div>
  );
}
