import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

export default function MainPage() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-10 rounded-2xl shadow-dnd w-full max-w-xl flex flex-col items-center">
        <h1 className="text-4xl text-dndgold mb-2" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          Вітаю, {user?.username}!
        </h1>
        <div className="flex flex-col gap-4 mt-6 w-full items-center">
          <button
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred rounded-2xl py-3 px-10 transition-all text-xl w-full text-center"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
            onClick={() => navigate('/characters')}
          >
            Мої персонажі
          </button>
          <button
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-3 px-10 transition-all text-xl w-full text-center"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
            onClick={() => navigate('/create-character')}
          >
            Створити персонажа
          </button>
          <button onClick={logout} className="mt-4 text-dndgold underline" style={{ fontFamily: 'IM Fell English SC, serif' }}>
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
