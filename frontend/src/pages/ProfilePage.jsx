import React from 'react';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl text-dndgold mb-4" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          Профіль користувача
        </h1>
        <div className="text-lg mb-2" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          <b>Ім'я:</b> {user?.username}
        </div>
        <div className="text-lg mb-2" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          <b>Роль:</b> {user?.role}
        </div>
        <button
          onClick={logout}
          className="mt-4 text-dndgold underline"
          style={{ fontFamily: 'IM Fell English SC, serif' }}
        >
          Вийти
        </button>
      </div>
    </div>
  );
}
