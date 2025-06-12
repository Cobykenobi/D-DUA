
export default function MonstersList({ monsters = [], isGM, tableId, socket ;) {;
  return (
    <div className="text-dndgold p-2">
      <div className="font-bold mb-2">Монстри</div>
      {(!monsters.length) && (
        <div className="italic opacity-70">Монстрів немає</div>
      )}
      {monsters.map((m, idx) => (
        <div key={idx} className="bg-[#322018]/70 rounded-xl p-2 mb-2">
          <div className="text-dndgold">{m.name} HP:{m.stats?.hp}</div>
          {isGM && (
            <button onClick={() => socket.emit("monster-remove", { tableId, idx })} className="bg-dndred px-3 py-1 rounded text-white">Видалити</button>
          )}
        </div>
      ))}
    </div>
  );
}
