import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/user';

export default function AdminPage() {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 p-10 rounded-2xl shadow-dnd w-full max-w-2xl flex flex-col items-center">
        <h1 className="font-dnd text-3xl text-dndgold mb-6">Адмін-панель</h1>
        <div className="flex flex-col gap-4 w-full items-center">
          <Link to="/admin/races" className="bg-dndgold text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndred hover:text-white">Расcи</Link>
          <Link to="/admin/professions" className="bg-dndgold text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndred hover:text-white">Професії</Link>
          <Link to="/admin/characteristics" className="bg-dndgold text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndred hover:text-white">Характеристики</Link>
          <Link to="/admin/maps" className="bg-dndgold text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndred hover:text-white">Карти</Link>
          <Link to="/admin/music" className="bg-dndgold text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndred hover:text-white">Музика</Link>
          <Link to="/" className="text-dndgold underline mt-4">Назад</Link>
        </div>
      </div>
    </div>
  );
}
