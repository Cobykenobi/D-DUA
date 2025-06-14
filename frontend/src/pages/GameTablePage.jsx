import GMPanel from "../components/GMPanel";
import InitiativeList from "../components/InitiativeList";
import ChatComponent from "../components/ChatComponent";
import PlayerCard from "../components/PlayerCard";
import MusicPlayer from "../components/MusicPlayer";
import DiceBox from "../components/DiceBox";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams, useSearchParams } from 'react-router-dom'
import { useUserStore } from '../store/user'

// socket connection URL configurable via env
// Fallback to localhost if env variable is missing
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function GameTablePage() {
  const { user } = useUserStore();
  const { tableId } = useParams();
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('char');
  const [players, setPlayers] = useState([]);
  const [gm, setGm] = useState(null);
  const [initiative, setInitiative] = useState([]);
  const [map, setMap] = useState("");
  const [messages, setMessages] = useState([]);

  // SOCKET.IO підключення
  useEffect(() => {
    socket.emit("join-table", { tableId, user, characterId });
    socket.on("table-players", data => {
      setPlayers(data.players || []);
      setGm(data.gm || null);
      setInitiative(data.initiative || []);
    });
    socket.on("initiative-update", setInitiative);
    socket.on("map-update", setMap);
    socket.on("chat-history", setMessages);
    socket.on("chat-message", msg => setMessages(m => [...m, msg]));
    return () => socket.disconnect();
  }, [tableId, user, characterId]);

  const isGM = (user?.role === 'master') || (gm && user && gm.toString() === user._id);


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
        <div className="font-dnd text-dndgold">{user?.login}</div>
        <div className="font-dnd text-dndgold text-2xl tracking-widest text-center flex-1">
          D&D Online Tabletop
        </div>
        <div className="font-dnd text-dndgold">Стiл: {tableId}</div>
      </div>
      <div className="relative flex-1 h-[80vh] bg-[#1b110a]/80 rounded-b-2xl px-6 pb-4 overflow-hidden">
        {/* Ліві слоти гравців */}
        <div className="md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2">
          {players.slice(0,3).map((p,i) => (
            <PlayerCard key={i} character={p.character} />
          ))}
        </div>
        {/* Праві слоти гравців */}
        <div className="md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 items-end mt-4 md:mt-0">
          {players.slice(3,6).map((p,i) => (
            <PlayerCard key={i} character={p.character} />
          ))}
        </div>
        {/* Центральна зона столу */}
        <div className="flex flex-col items-center justify-center h-full z-0">
          <div className="w-full h-[40vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-4 border-2 border-dndgold">
            {map ? (
              <img src={map} alt="Map" className="max-h-full max-w-full rounded-xl" />
            ) : (
              <span className="text-dndgold font-dnd text-2xl">[Карта ще не обрана]</span>
            )}
          </div>
          <InitiativeList initiative={initiative} />
          {isGM && (
            <GMPanel tableId={tableId} socket={socket} players={players} />
          )}
        </div>
        {/* Чат та музика */}
        <div className="md:absolute md:bottom-4 md:left-4 md:w-72 w-full flex flex-col gap-4 z-20 mt-4 md:mt-0">
          <ChatComponent tableId={tableId} user={user} messages={messages} socket={socket} />
          <MusicPlayer isGM={isGM} />
        </div>
        {/* Кубики */}
        <div className="md:absolute md:bottom-4 md:right-4 z-10 mt-4 md:mt-0">
          <DiceBox />
        </div>
      </div>
      <div className="p-4 bg-[#322018]/90 text-center font-dnd text-dndgold rounded-b-2xl">
        © {new Date().getFullYear()} D&D Online Tabletop
      </div>
    </div>
  );
}
