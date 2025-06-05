import React from "react";

export default function MonstersList({ monsters, isGM, tableId, socket }) {
  const remove = (idx) => socket.emit("monster-remove", { tableId, idx });
  if (!monsters.length) return <div className="text-dndgold p-2">Монстрів немає</div>;
  return (
    <div>
      <div className="text-dndgold font-bold mb-2">Монстри</div>
      {monsters.map((m, idx) => (
        <div key={idx} className="bg-[#322018]/70 rounded-xl p-2 mb-2">
          <div className="text-dndgold">{m.name} HP:{m.stats.hp}</div>
          {isGM && (
            <button onClick={() => remove(idx)} className="bg-dndred px-3 py-1 rounded text-white">Видалити</button>
          )}
        </div>
      ))}
    </div>
  );
}
