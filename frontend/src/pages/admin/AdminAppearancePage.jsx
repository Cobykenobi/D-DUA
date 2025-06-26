import { useEffect, useState, useRef } from 'react';
import { getAppearance, updateAppearance } from '../../api/adminActions';
import { Link } from 'react-router-dom';
import { useAppearance } from '../../context/AppearanceContext';

export default function AdminAppearancePage() {
  const [theme, setTheme] = useState('light');
  const [file, setFile] = useState(null);
  const fileInput = useRef();
  const { refreshAppearance } = useAppearance();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAppearance();
      setTheme(res.data.theme || 'light');
    };
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('theme', theme);
    if (file) formData.append('background', file);
    await updateAppearance(formData);
    fileInput.current.value = null;
    setFile(null);
    refreshAppearance();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Налаштування вигляду</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="text-dndgold">Тема:</label>
          <select value={theme} onChange={e => setTheme(e.target.value)} className="bg-[#2c1a12] border border-dndgold text-dndgold rounded-2xl px-3 py-2">
            <option value="light">Світла</option>
            <option value="dark">Темна</option>
          </select>
          <label className="text-dndgold">Фон (картинка):</label>
          <input type="file" accept="image/*" ref={fileInput} onChange={e => setFile(e.target.files[0])} className="bg-[#2c1a12] border border-dndgold text-dndgold rounded-2xl px-3 py-2" />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 transition active:scale-95">Зберегти</button>
        </form>
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
