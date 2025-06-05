import React from 'react';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export default function GameTablePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-3xl text-dndgold mb-4" style={{ fontFamily: 'IM Fell English SC, serif' }}>
          Ігровий стіл
        </h1>
        {/* Тут твій ігровий функціонал */}
      </div>
    </div>
  );
}
