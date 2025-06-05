import React from 'react';
import { useUserStore } from '../store/user';
import { Link } from 'react-router-dom';

export default function GameTablePage() {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 w-full max-w-[1600px] min-h-[85vh] rounded-2xl shadow-dnd flex flex-col">
        <div className="flex justify-between items-center p-4 bg-[#322018]/95 rounded-t-2xl">
          <Link to="/" className="font-dnd text-dndgold text-xl">← На головну</Link>
          <div className="font-dnd text-dndgold text-xl">D&D Online Tabletop</div>
          <div className="font-dnd text-dndgold">{user?.username}</div>
        </div>
        <div className="flex flex-1 h-[60vh]">
          {/* Ліва панель: карточки гравців */}
          <div className="w-1/5 p-2 space-y-2 bg-[#25160f]/80 overflow-y-auto rounded-bl-2xl">
            <div className="font-dnd text-dndgold text-lg mb-2">Гравці</div>
            {/* тут рендеряться карти гравців */}
          </div>
          {/* Центральна частина: карта / зображення / кубики */}
          <div className="flex-1 flex flex-col items-center justify-center bg-[#20100a]/70">
            <div className="w-full h-[40vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-4">
              <span className="text-dndgold font-dnd text-2xl">[Тут буде карта або ілюстрація]</span>
            </div>
            <div className="w-full flex justify-center gap-4">
              {/* Кнопки для кидків кубиків */}
              <button className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all">Кинути D20</button>
              <button className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all">Кинути D6</button>
            </div>
          </div>
          {/* Права панель: карточки гравців */}
          <div className="w-1/5 p-2 space-y-2 bg-[#25160f]/80 overflow-y-auto rounded-br-2xl">
            <div className="font-dnd text-dndgold text-lg mb-2">Гравці</div>
          </div>
        </div>
        {/* Футер: тут можна вставити музичний програвач */}
        <div className="p-4 bg-[#322018]/95 text-center font-dnd text-dndgold rounded-b-2xl">
          © {new Date().getFullYear()} D&D Online Tabletop
        </div>
      </div>
    </div>
  );
}
