import GMPanel from "../components/GMPanel";
import InitiativeList from "../components/InitiativeList";
import ChatComponent from "../components/ChatComponent";
import PlayerCard from "../components/PlayerCard";
import MusicPlayer from "../components/MusicPlayer";
import DiceBox from "../components/DiceBox";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

// socket connection URL configurable via env
// Fallback to localhost if env variable is missing
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function GameTablePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { tableId } = useParams();
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('char');
  const [players, setPlayers] = useState([]);
  const [gm, setGm] = useState(null);
  const [visiblePlayers, setVisiblePlayers] = useState([]);
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
      setVisiblePlayers((data.players || []).filter(p => p.user !== data.gm));
    });
    socket.on("initiative-update", setInitiative);
    socket.on("map-update", setMap);
    socket.on("chat-history", setMessages);
    socket.on("chat-message", msg => setMessages(m => [...m, msg]));
    return () => socket.disconnect();
  }, [tableId, user, characterId]);

  const isGM = (user?.role === 'master') || (gm && user && gm.toString() === user._id);


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/nd-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'IM Fell English SC', serif"
      }}
      className="relative"
    >
      <div className="relative flex justify-between items-center p-4 bg-[#322018]/90 rounded-t-2xl">
        <div className="font-dnd text-dndgold">{user?.login}</div>
        <div className="font-dnd text-dndgold text-2xl tracking-widest text-center flex-1">
          D&D Online Tabletop
        </div>
        <div className="flex items-center gap-2">
          <span className="font-dnd text-dndgold whitespace-nowrap">Стiл: {tableId}</span>
          <button
            onClick={() => navigate(`/lobby?tableId=${tableId}${characterId ? `&char=${characterId}` : ''}`)}
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
          >
            Назад
          </button>
          <LogoutButton />
        </div>
      </div>
      <div className="relative flex-1 h-[80vh] bg-[#1b110a]/80 rounded-b-2xl px-6 pb-4 md:pb-32 overflow-hidden">
        {/* Ліві слоти гравців */}
        <div className="md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2">
          {visiblePlayers.slice(0,3).map((p,i) => (
            <PlayerCard key={i} character={p.character} />
          ))}
        </div>
        {/* Праві слоти гравців */}
        <div className="md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 items-end mt-4 md:mt-0">
          {visiblePlayers.slice(3,6).map((p,i) => (
            <PlayerCard key={i} character={p.character} />
          ))}
        </div>
        {/* Центральна зона столу */}
        <div className="flex flex-col items-center justify-center h-full z-0 md:mx-60">
          <div className="w-full h-[40vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-4 border-2 border-dndgold">
            {map ? (
              <img src={map} alt="Map" className="max-h-full max-w-full rounded-xl" />
            ) : (
              <span className="text-dndgold font-dnd text-2xl">[Карта ще не обрана]</span>
            )}
          </div>
          <InitiativeList initiative={initiative} />
        </div>
        {/* Нижня панель */}
        <div
          className={`md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2 z-20 mt-4 md:mt-0 flex flex-wrap gap-4 ${isGM ? 'justify-center items-end md:w-auto w-full' : 'justify-center w-full'}`}
        >
          {isGM ? (
            <>
              <ChatComponent tableId={tableId} user={user} messages={messages} socket={socket} />
              <MusicPlayer isGM={isGM} className="w-32 md:w-40" />
              <GMPanel tableId={tableId} socket={socket} players={players} className="w-48" />
              <DiceBox className="self-end w-40" />
            </>
          ) : (
            <>
              <div className="md:w-72 w-full">
                <ChatComponent tableId={tableId} user={user} messages={messages} socket={socket} />
              </div>
              <DiceBox className="self-end" />
            </>
          )}
        </div>
      </div>
      <div className="p-4 bg-[#322018]/90 text-center font-dnd text-dndgold rounded-b-2xl">
        © {new Date().getFullYear()} D&D Online Tabletop
      </div>
    </div>
  );
}
