import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PlayerCard from "../components/PlayerCard";

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api.get("/api/character")
      .then(res => setCharacters(res.data))
      .catch(() => setCharacters([]));
  }, []);

  return (
    <div className="flex flex-col items-center mt-4 space-y-6">
      <h2 className="text-2xl font-dnd text-dndgold">Список персонажів</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {characters.map(char => (
          <PlayerCard key={char._id || char.id} player={char} />
        ))}
      </div>
    </div>
  );
}
