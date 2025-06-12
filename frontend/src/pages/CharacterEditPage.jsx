import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api/axios";

export default function CharacterEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    api.get(`/api/character/${id}`)
      .then(res => {
        setCharacter(res.data);
        setName(res.data.name || "");
        setDescription(res.data.description || "");
      })
      .catch(() => setError("Не вдалося завантажити персонажа"));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    try {

      await api.put(`/api/character/${id}`, { name, description });
      navigate("/characters");
    } catch (err) {
      setError("Не вдалося зберегти зміни");
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!character) return <div>Завантаження...</div>;

  return (
    <form onSubmit={handleSave}>
      <h2>Редагування персонажа</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ім'я"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Опис"
      />
      <button type="submit">Зберегти</button>
    </form>
  );
}
