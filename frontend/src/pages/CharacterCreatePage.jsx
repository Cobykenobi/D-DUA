import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  races,
  classes,
  getRandomElement,
  getRandomStats,
  getRandomInventory,
} from "../utils/characterUtils";

export default function CharacterCreatePage() {

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
      const stats = getRandomStats(charClass);
      const inventory = getRandomInventory();

      let imgUrl = "";
      try {
        const imgRes = await api.post("/ai/avatar", {
          description: `${race} ${charClass}`,
        });
        imgUrl = imgRes.data?.url || "";
      } catch {
        imgUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
          name || race + charClass
        )}`;
      }


      const res = await api.post("/api/character", {
 main
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

  return (
    <div>
      <h2>Створення персонажа</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Біо"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Створення..." : "Створити"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {char && (
        <div>
          <h3>Персонаж створений!</h3>
          {char.img && <img src={char.img} alt={char.name} width="200" />}
        </div>
      )}
    </div>
  );
}
