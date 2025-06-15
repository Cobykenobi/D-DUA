import api from "../api/axios";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

export default function CharacterEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    api.get(`/character/${id}`)
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

      let payload;
      let headers;
      if (image) {
        payload = new FormData();
        payload.append('name', name);
        payload.append('description', description);
        payload.append('image', image);
        headers = { 'Content-Type': 'multipart/form-data' };
      } else {
        payload = { name, description };
        headers = { 'Content-Type': 'application/json' };
      }
      await api.put(`/character/${id}`, payload, { headers });
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
