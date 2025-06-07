import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// ... (залишаєш races, classes, getRandomElement, generateStats, inventoryItems, getRandomInventory — як є)

export default function CreateCharacterPage() {
  // ... (стейт і логіка генерації — як було)

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [char, setChar] = useState(null);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(null);
  const navigate = useNavigate();

  // Генеруємо наперед
  const handleGenerate = () => {
    // ... (твоя логіка генерації)
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!generated) handleGenerate();
      const { race, charClass, stats, inventory, imgUrl } = generated || {};

      const res = await api.post("/characters", {
        name,
        bio,
        race: race.name,
        class: charClass.name,
        stats,
        inventory,
        img: imgUrl,
      });

      setChar({ ...res.data, ...generated, name, bio });
    } catch (err) {
      setError("Помилка створення персонажа");
    }
    setLoading(false);
  };

  useEffect(() => { handleGenerate(); }, []);

  // ... (JSX повернення — як було)
}
