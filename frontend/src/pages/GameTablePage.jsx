import React, { useEffect, useState, useRef } from "react";
import { useUserStore } from "../store/user";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import GMPanel from "../components/GMPanel";
import InitiativeList from "../components/InitiativeList";
import MonstersList from "../components/MonstersList";
import ChatComponent from "../components/ChatComponent";

// !!! ВАЖЛИВО: якщо бек локально — зміни на своє посилання
const socket = io("https://d-dua.onrender.com");

export default function GameTablePage() {
  const { user } = useUserStore();
  const { tableId } = useParams();
  const [players, setPlayers] = useState([]);
  const [gm, setGm] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [initiative, setInitiative] = useState([]);
  const [map, setMap] = useState("");
  const [messages, setMessages] = useState([]);
  const [diceResult, setDiceResult] = useState(null);
  const [diceAnim, setDiceAnim] = useState(false);

  // SOCKET.IO підключення
  useEffect(() => {
    socket.emit("join-table", { tableId, user });
    socket.on("table-players", data => {
      setPlayers(data.players || []);
      setGm(data.gm || null);
      setMonsters(data.monsters || []);
      setInitiative(data.initiative || []);
    });
    socket.on("monsters-update", setMonsters);
    socket.on("initiative-update", setInitiative);
    socket.on("map-update", setMap);
    socket.on("chat-history", setMessages);
    socket.on("chat-message", msg => setMessages(m => [...m, msg]));
    return () => socket.disconnect();
  }, [tableId, user]);

  // Кубики
  const rollDice = (type = "d20") => {
    setDiceAnim(true);
    setTimeout(() => {
      setDiceAnim(false);
      const res = type === "d20"
        ? Math.ceil(Math.random() * 20)
        : Math.ceil(Math.random() * 6);
      setDiceResult(res);
    }, 600);
  };

  const isGM = gm && user && gm.toString() === user._id;

  // Відображаємо свого персонажа (user.username + characterName/characterId)
  const myPlayer = players.find(p => p.user === user._id || p.user?._id === user._id);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url('/nd-bg.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "'IM Fell English SC', serif"
    }}>
      <div className="flex justify-between items-center p-4 bg-[#322018]/90 rounded-t-2xl">
        <div className="font-dnd text-dndgold">{user?.username}</div>
        <div className="font-dnd text-dndgold text-2xl tracking-widest text-center flex-1">
          D&D Online Tabletop
        </div>
        <div className="font-dnd text-dndgold">Стiл: {tableId}</div>
      </div>
      <div className="flex flex-1 h-[80vh] bg-[#1b110a]/80 rounded-b-2xl px-6 pb-4">
        {/* Ліва панель: твій персонаж */}
        <div className="w-1/6 p-2">
          <div className="bg-[#25160f]/80 rounded-2xl p-4 mb-4 text-dndgold">
            <div className="text-lg font-bold mb-2">Твій персонаж</div>
            <div>Ім'я: <b>{myPlayer?.name || user?.username}</b></div>
            <div>ID: <b>{myPlayer?.characterId || user?._id}</b></div>
            <div>Онлайн: {myPlayer?.online ? "Так" : "Ні"}</div>
            {/* Можна додати фото */}
          </div>
          <MonstersList monsters={monsters} isGM={isGM} tableId={tableId} socket={socket} />
        </div>
        {/* Центр: карта, кубики, ініціатива */}
        <div className="flex-1 flex flex-col items-center justify-between py-6 px-4">
          <div className="w-full h-[40vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-4 border-2 border-dndgold">
            {map ? (
              <img src={map} alt="Map" className="max-h-full max-w-full rounded-xl" />
            ) : (
              <span className="text-dndgold font-dnd text-2xl">[Карта ще не обрана]</span>
            )}
          </div>
          <InitiativeList initiative={initiative} />
          {/* Кнопки кубиків */}
          <div className="flex gap-2 mt-4 mb-2">
            <button
              className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
              onClick={() => rollDice("d20")}
            >
              Кинути D20
            </button>
            <button
              className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
              onClick={() => rollDice("d6")}
            >
              Кинути D6
            </button>
          </div>
          {/* Анімація/результат кидка */}
          {diceAnim && (
            <div className="animate-bounce text-3xl text-dndgold">🎲 ...</div>
          )}
          {diceResult && !diceAnim && (
            <div className="text-2xl text-dndgold font-bold mb-2">Результат: {diceResult}</div>
          )}
          {/* GM-панель */}
          {isGM && (
            <GMPanel tableId={tableId} socket={socket} players={players} />
          )}
        </div>
        {/* Права панель: чат */}
        <div className="w-1/6 p-2">
          <ChatComponent tableId={tableId} user={user} messages={messages} socket={socket} />
        </div>
      </div>
      <div className="p-4 bg-[#322018]/90 text-center font-dnd text-dndgold rounded-b-2xl">
        © {new Date().getFullYear()} D&D Online Tabletop
      </div>
    </div>
  );
}
