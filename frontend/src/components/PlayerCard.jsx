import React from "react";

export default function PlayerCard({ character, onSelect }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-gradient-to-br from-gray-800 to-black text-white font-dnd">
      <img src={character.image || "/default-avatar.png"} alt="character" className="rounded mb-2 h-32 w-full object-cover" />
      <h3 className="text-xl text-dndgold">{character.name}</h3>
      <p className="text-sm">Раса: {character.race}</p>
      <p className="text-sm">Клас: {character.class}</p>
      <button onClick={() => onSelect(character)} className="mt-2 bg-red-800 px-3 py-1 text-sm rounded text-white hover:bg-red-700">Грати</button>
    </div>
  );
}