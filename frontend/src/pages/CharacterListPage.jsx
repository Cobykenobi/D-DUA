import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PlayerCard from "../components/PlayerCard";

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api.get("/characters")
      .then(res => setCharacters(res.data))
      .catch(() => setCharacters([]));
  }, []);

  return (
    <div>
      <h2>Список персонажів</h2>
      <ul>
        {characters.map(char => (
          <PlayerCard key={char._id || char.id} character={char} />
        ))}
      </ul>
    </div>
  );
}
