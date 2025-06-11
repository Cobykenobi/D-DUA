
export default function GMPanel({ tableId, socket, players }) {
  const [monsterName, setMonsterName] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [initiativeList, setInitiativeList] = useState([]);

  // Додати монстра
  const addMonster = () => {
    if (monsterName.trim()) {
      socket.emit("monster-add", { tableId, monster: { name: monsterName, stats: { hp: 12, attack: 3 }, img: "" } });
      setMonsterName("");
    }
  };
  // Додати ініціативу
  const startInitiative = () => {
    socket.emit("initiative-start", { tableId, items: initiativeList });
    setInitiativeList([]);
  };
  // Оновити карту
  const updateMap = () => {
    socket.emit("map-update", { tableId, map: mapUrl });
    setMapUrl("");
  };
  // Кік гравця
  const kick = (userId) => {
    socket.emit("kick-player", { tableId, userId });
  };

  // Додаємо гравців у ініціативу
  const handleInitiativeInput = () => {
    setInitiativeList(players.map(p => ({ name: p.name, value: Math.ceil(Math.random()*20), type: "player" })));
  };

  return (
    <div className="bg-[#25160f]/80 rounded-2xl p-4 mb-2 mt-4 text-center">
      <div className="text-dndgold text-xl font-bold mb-2">GM-панель</div>
      {/* Додавання монстра */}
      <div className="mb-2">
        <input
          className="rounded px-2 py-1 mr-2"
          value={monsterName}
          onChange={e => setMonsterName(e.target.value)}
          placeholder="Ім'я монстра"
        />
        <button className="bg-dndgold px-4 py-2 rounded-xl" onClick={addMonster}>Додати монстра</button>
      </div>
      {/* Кік гравців */}
      <div className="mb-2">
        {players.map(p => (
          <button key={p.user} onClick={() => kick(p.user)} className="bg-dndred px-3 py-1 rounded-xl m-1 text-white">{p.name} Кік</button>
        ))}
      </div>
      {/* Ініціатива */}
      <div className="mb-2">
        <button className="bg-dndgold px-4 py-2 rounded-xl" onClick={handleInitiativeInput}>Згенерувати ініціативу</button>
        <button className="bg-dndgold px-4 py-2 rounded-xl ml-2" onClick={startInitiative}>Почати ініціативу</button>
      </div>
      {/* Оновити карту */}
      <div>
        <input className="rounded px-2 py-1 mr-2" value={mapUrl} onChange={e => setMapUrl(e.target.value)} placeholder="Посилання на карту" />
        <button className="bg-dndgold px-4 py-2 rounded-xl" onClick={updateMap}>Оновити карту</button>
      </div>
    </div>
  );
}
