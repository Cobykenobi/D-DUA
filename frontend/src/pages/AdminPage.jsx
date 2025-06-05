import React from 'react';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (!user || (user.role !== 'admin' && user.role !== 'master')) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-10 rounded-2xl shadow-dnd w-full max-w-xl flex flex-col items-center">
        <h1 className="text-4xl text-dndgold mb-4" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          Адмін-панель
        </h1>
        {/* Додай сюди адмін-функціонал */}
      </div>
    </div>
  );
}
