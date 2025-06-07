import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import api from "../api/axios";

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api.get("/characters")
      .then(res => setCharacters(res.data))
      .catch(() => setCharacters([]));
  }, []);

  // ... (JSX — як було)
}
