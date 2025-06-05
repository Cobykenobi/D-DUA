import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import GMPanel from "../components/GMPanel";
import InitiativeList from "../components/InitiativeList";
import MonstersList from "../components/MonstersList";
import ChatComponent from "../components/ChatComponent";

const socket = io("https://d-dua.onrender.com"); // твій бекенд

export default function GameTablePage() {
  const { user } = useUserStore();
  const { tableId } = useParams();
  const [players, setPlayers] = useState([]);
  const [gm, setGm] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [initiative, setInitiative] = useState([]);
  const [map, setMap] = useState("");
  const [messages, setMessages] = useState([]);

  // ===== SOCKET.IO: =====
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

  const isGM = gm && user && gm.toString() === user._id;

  return (
    <div className="min-h-screen flex flex-col bg-dndbg">
      <div className="flex justify-between items-center p-4 bg-[#322018]/90 rounded-t-2xl">
        <div className="font-dnd text-dndgold">{user?.username}</div>
        <div className="font-dnd text-dndgold text-2xl tracking-widest text-center flex-1">D&D Online Tabletop</div>
        <div className="font-dnd text-dndgold">Стiл: {tableId}</div>
      </div>
      <div className="flex flex-1 h-[80vh] bg-[#1b110a]/80 rounded-b-2xl px-6 pb-4">
        {/* Ліва панель: монстри */}
        <div className="w-1/6 p-2">
          <MonstersList monsters={monsters} isGM={isGM} tableId={tableId} socket={socket} />
        </div>
        {/* Центр: карта, ініціатива, GM панель */}
        <div className="flex-1 flex flex-col items-center justify-between py-6 px-4">
          <div className="w-full h-[40vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-4 border-2 border-dndgold">
            {map ? (
              <img src={map} alt="Map" className="max-h-full max-w-full rounded-xl" />
            ) : (
              <span className="text-dndgold font-dnd text-2xl">[Карта ще не обрана]</span>
            )}
          </div>
          <InitiativeList initiative={initiative} />
          {isGM && <GMPanel tableId={tableId} socket={socket} players={players} />}
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
