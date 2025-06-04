import React from 'react';

export default function PlayerCard({ player, character, active }) {
  return (
    <div className={`rounded-2xl shadow-dnd bg-[#2c1a12] p-3 mb-2 ${active ? 'border-4 border-dndgold' : 'border border-dndgold/40'}`}>
      <div className="font-dnd text-dndgold text-lg mb-1">{player?.username}</div>
      {character && (
        <>
          <div className="text-dndgold/80">{character.name}</div>
          <div className="text-xs text-dndgold/70">{character.race} / {character.profession}</div>
        </>
      )}
      {character?.image && <img src={character.image} alt="avatar" className="w-16 h-16 rounded-xl mt-2 object-cover" />}
    </div>
  );
}
