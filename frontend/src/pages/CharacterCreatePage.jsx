import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/user';
import { useNavigate, Link } from 'react-router-dom';
import InventoryEditor from '../components/InventoryEditor';

export default function CharacterCreatePage() {
  const { token } = useUserStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [randomRace, setRandomRace] = useState('');
  const [randomProfession, setRandomProfession] = useState('');
  const [randomStats, setRandomStats] = useState({});
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRaces, setAllRaces] = useState([]);
  const [allProfessions, setAllProfessions] = useState([]);
  const [allCharacteristics, setAllCharacteristics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const races = await axios.get('/api/races', { headers: { Authorization: `Bearer ${token}` } });
      const professions = await axios.get('/api/professions', { headers: { Authorization: `Bearer ${token}` } });
      const characteristics = await axios.get('/api/characteristics', { headers: { Authorization: `Bearer ${token}` } });
      setAllRaces(races.data);
      setAllProfessions(professions.data);
      setAllCharacteristics(characteristics.data);
    };
    fetchData();
  }, [token]);

  const randomize = () => {
    if (!allRaces.length || !allProfessions.length || !allCharacteristics.length) return;
    setRandomRace(allRaces[Math.floor(Math.random() * allRaces.length)].name);
    setRandomProfession(allProfessions[Math.floor(Math.random() * allProfessions.length)].name);
    const stats = {};
    allCharacteristics.forEach(ch => {
      stats[ch.name] = 6 + Math.floor(Math.random() * 13); // 6-18
    });
    setRandomStats(stats);
    setInventory(["Факел", "Рюкзак", "Золоті монети: " + (5 + Math.floor(Math.random()*16))]);
  };
  useEffect(randomize, [allRaces, allProfessions, allCharacteristics]);

  const handleImg = e => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImgPreview(URL.createObjectURL(file));
    else setImgPreview('');
  };

  const generateAva = async () => {
    setLoading(true);
    const res = await axios.post('/api/ai-avatar', {
      name,
      race: randomRace,
      profession: randomProfession,
      description,
    }, { headers: { Authorization: `Bearer ${token}` } });
    setImgPreview(res.data.imageUrl); // URL або base64
    setImage(null); // Якщо треба
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('race', randomRace);
    formData.append('profession', randomProfession);
    formData.append('stats', JSON.stringify(randomStats));
    formData.append('inventory', JSON.stringify(inventory));
    if (image) formData.append('image', image);
    else if (imgPreview && imgPreview.startsWith('data:image')) formData.append('image', imgPreview);
    setLoading(true);
    await axios.post('/api/characters', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    navigate('/characters');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl mt-10">
        <h1 className="font-dnd text-2xl text-dndgold mb-4 text-center">Створити персонажа</h1>
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
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <input type="file" accept="image/*" onChange={handleImg} className="text-dndgold" />
            <button type="button" onClick={generateAva} className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2">Згенерувати аватарку AI</button>
          </div>
          {imgPreview && <img src={imgPreview} alt="preview" className="w-24 h-24 rounded-xl object-cover mx-auto" />}
          <div className="flex flex-wrap gap-3 text-dndgold/90">
            <div><b>Раса:</b> {randomRace}</div>
            <div><b>Професія:</b> {randomProfession}</div>
          </div>
          <div className="mb-2">
            <div className="text-dndgold/80">Характеристики:</div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(randomStats).map(([k,v]) => <div key={k}>{k}: <b>{v}</b></div>)}
            </div>
          </div>
          <div className="mb-2">
            <div className="text-dndgold/80">Інвентар:</div>
            <InventoryEditor inventory={inventory} onChange={setInventory} />
          </div>
          <button type="button" onClick={randomize} className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all">Згенерувати нові стати</button>
          <button disabled={loading} type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 w-full mt-4 hover:bg-dndred hover:text-white transition-all">Створити персонажа</button>
        </form>
        <Link to="/characters" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
