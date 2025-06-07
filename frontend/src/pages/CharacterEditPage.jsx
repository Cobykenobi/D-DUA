import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useUserStore } from '../store/user';
import { useNavigate, useParams, Link } from 'react-router-dom';
import InventoryEditor from '../components/InventoryEditor';

export default function CharacterEditPage() {
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
      const res = await api.get(`/characters/${id}`);
      setCharacter(res.data);
      setName(res.data.name);
      setDescription(res.data.description || '');
      setImgPreview(res.data.image || '');
      setInventory(Array.isArray(res.data.inventory) ? res.data.inventory : []);
    };
    fetchChar();
  }, [id]);

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
    await api.put(`/characters/${id}`, formData);
    setLoading(false);
    window.history.back();
  };

  if (!character) return <div className="min-h-screen flex items-center justify-center bg-dndbg text-dndgold">Завантаження...</div>;

  // ... (JSX — як було)
}
