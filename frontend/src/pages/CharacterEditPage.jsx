import api from "../api/axios";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CharacterEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      .catch(() => setError(t('error_load_character')));
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
      setError(t('error_save_changes'));
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!character) return <div>{t('loading')}</div>;

  return (
    <form onSubmit={handleSave}>
      <h2>{t('edit_character')}</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={t('name')}
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder={t('description')}
      />
      <button type="submit">{t('save')}</button>
    </form>
  );
}
