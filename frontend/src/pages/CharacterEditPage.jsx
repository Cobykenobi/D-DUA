import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/user';
import { useNavigate, useParams, Link } from 'react-router-dom';
import InventoryEditor from '../components/InventoryEditor';

export default function CharacterEditPage() {
  const { token } = useUserStore();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [image, setImage] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChar = async () => {
      const res = await axios.get(`/api/characters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCharacter(res.data);
      setName(res.data.name);
      setDescription(res.data.description || '');
      setImgPreview(res.data.image || '');
      setInventory(Array.isArray(res.data.inventory) ? res.data.inventory : []);
    };
    fetchChar();
  }, [id, token]);

  const handleImg = e => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);
    formData.append('inventory', JSON.stringify(inventory));
    await axios.put(`/api/characters/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    window.history.back();
  };

  if (!character) return <div className="min-h-screen flex items-center justify-center bg-dndbg text-dndgold">Завантаження...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl mt-10">
        <h1 className="font-dnd text-2xl text-dndgold mb-4 text-center">Редагування персонажа</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Ім'я персонажа"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            rows={2}
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Короткий опис чи історія"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImg} className="text-dndgold" />
          {imgPreview && <img src={imgPreview} alt="preview" className="w-24 h-24 rounded-xl object-cover mx-auto" />}
          <div className="mb-2">
            <div className="text-dndgold/80">Інвентар:</div>
            <InventoryEditor inventory={inventory} onChange={setInventory} />
          </div>
          <button disabled={loading} type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 w-full mt-4 hover:bg-dndred hover:text-white transition-all">Зберегти</button>
        </form>
        <Link to="/characters" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
