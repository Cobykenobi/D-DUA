import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, token, logout, restore } = useUserStore();
  const [volume, setVolume] = useState(user?.settings?.musicVolume || 70);
  const [brightness, setBrightness] = useState(user?.settings?.brightness || 100);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    restore();
    if (!user) navigate('/login');
  }, [user, navigate, restore]);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await axios.put('/api/user/settings', {
        musicVolume: volume,
        brightness,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      // ...
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full">
        <h2 className="font-dnd text-2xl text-dndgold mb-4 text-center">Профіль: {user?.username}</h2>
        <div className="mb-4">
          <div className="mb-2">Гучність фонової музики:</div>
          <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full" />
          <div>{volume} %</div>
        </div>
        <div className="mb-6">
          <div className="mb-2">Яскравість гри:</div>
          <input type="range" min="50" max="150" value={brightness} onChange={e => setBrightness(Number(e.target.value))} className="w-full" />
          <div>{brightness} %</div>
        </div>
        <button onClick={saveSettings} disabled={saving} className="w-full bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl py-2 transition-all mb-2">
          Зберегти
        </button>
        <button onClick={logout} className="w-full text-dndgold underline mt-2">Вийти</button>
      </div>
    </div>
  );
}
