import React, { useEffect } from 'react';
import { useUserStore } from '../store/user';
import { useNavigate, Link } from 'react-router-dom';

export default function MainPage() {
  const { user, logout, restore } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => { restore(); }, [restore]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 p-10 rounded-2xl shadow-dnd w-full max-w-xl flex flex-col items-center">
        <h1 className="font-dnd text-4xl text-dndgold mb-2">Ласкаво просимо, {user?.username}!</h1>
        <div className="flex flex-col gap-4 mt-6 w-full items-center">
          <Link to="/table" className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center">Почати гру</Link>
          {(user?.role === 'master' || user?.role === 'admin') && (
            <Link to="/admin" className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center">Адмін-панель</Link>
          )}
          <Link to="/profile" className="bg-transparent border border-dndgold text-dndgold font-dnd rounded-2xl py-3 px-10 transition-all text-xl w-full text-center hover:bg-dndgold/10">Профіль</Link>
          <button onClick={logout} className="mt-4 text-dndgold underline">Вийти</button>
        </div>
      </div>
    </div>
  );
}
