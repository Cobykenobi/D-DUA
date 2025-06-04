import React from 'react';
import InventoryList from './InventoryList';

export default function CharacterCard({ character }) {
  if (!character) return null;
  return (
    <div className="rounded-2xl shadow-dnd bg-[#20100a] p-5 mb-4 flex flex-col md:flex-row gap-5 items-center">
      {character.image && <img src={character.image} alt="avatar" className="w-24 h-24 rounded-xl object-cover" />}
      <div className="flex-1">
        <div className="font-dnd text-dndgold text-xl mb-2">{character.name}</div>
        <div className="text-dndgold/80 text-sm mb-2">{character.race} / {character.profession}</div>
        <div className="mb-2"><b className="text-dndgold/90">Опис:</b> {character.description || <span className="text-dndgold/40">немає</span>}</div>
        <div className="mb-2"><b className="text-dndgold/90">Характеристики:</b>
          <div className="flex flex-wrap gap-3 mt-1">
            {character.stats && Object.entries(character.stats).map(([k, v]) => <span key={k}>{k}: <b>{v}</b></span>)}
          </div>
        </div>
        <div className="mb-2"><b className="text-dndgold/90">Інвентар:</b>
          <InventoryList inventory={character.inventory} />
        </div>
      </div>
    </div>
  );
}
