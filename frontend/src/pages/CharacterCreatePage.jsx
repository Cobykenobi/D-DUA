import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// ... (дані для рандому залишаєш як є)

export default function CharacterCreatePage() {
  // ... (твій стейт і функції getRandomElement, getRandomStats, getRandomInventory)

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
      // Генеруємо характеристики
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

  // ... (JSX — як було)
}
