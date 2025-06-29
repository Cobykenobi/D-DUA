import InitiativeList from "../components/InitiativeList";
import ChatComponent from "../components/ChatComponent";
import PlayerCard from "../components/PlayerCard";
import DiceBox from "../components/DiceBox";
import LogoutButton from "../components/LogoutButton";
import LanguageSwitch from "../components/LanguageSwitch";
import GMTableView from "../components/GMTableView";
import GMControlPanel from "../components/GMControlPanel";
import { GMTools } from "./gm/GMControlPage";
import { useState, useEffect } from 'react';
import socket from '../api/socket';
import { GameStateProvider } from '../context/GameStateContext';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';
import { useTranslation } from 'react-i18next';

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
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('game');
  const { t } = useTranslation();

  // SOCKET.IO підключення
  useEffect(() => {
    socket.on("table-players", data => {
      setPlayers(data.players || []);
      setGm(data.gm || null);
      setInitiative(data.initiative || []);
      setVisiblePlayers((data.players || []).filter(p => p.user !== data.gm));
    });
    const onInv = ({ characterId, inventory }) => {
      setPlayers(ps => ps.map(p => (
        p.character && p.character._id === characterId
          ? { ...p, character: { ...p.character, inventory } }
          : p
      )));
    };
    const onInvAll = data => {
      setPlayers(ps => ps.map(p => (
        p.character && data[p.character._id]
          ? { ...p, character: { ...p.character, inventory: data[p.character._id] } }
          : p
      )));
    };
    socket.on('inventory-update', onInv);
    socket.on('inventory-update-all', onInvAll);
    socket.on("initiative-update", setInitiative);
    socket.on("chat-history", setMessages);
    socket.on("chat-message", msg => setMessages(m => [...m, msg]));
    socket.on("gm-message", msg => {
      if (msg.targetUserId === 'all' || msg.targetUserId === user?._id) {
        setMessages(m => [...m, { user: 'GM', text: msg.text, userRole: 'gm' }]);
      }
    });
    return () => {
      socket.off("table-players");
      socket.off('inventory-update', onInv);
      socket.off('inventory-update-all', onInvAll);
      socket.off("initiative-update");
      socket.off("chat-history");
      socket.off("chat-message");
      socket.off("gm-message");
    };
  }, [tableId, user, characterId]);

  const isGM = (user?.role === 'gm') || (gm && user && gm.toString() === user._id);


  return (
    <GameStateProvider tableId={tableId} user={user}>
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('./nd-bg.png')`,
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
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-dnd text-dndgold whitespace-nowrap">{t('table')}: {tableId}</span>
          <button
            onClick={() => navigate(`/lobby?tableId=${tableId}${characterId ? `&char=${characterId}` : ''}`)}
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
          >
            {t('back')}
          </button>
          <LogoutButton />
          <LanguageSwitch />
          {isGM && (
            <button
              onClick={() => window.open('/gm-control/' + tableId, '_blank')}
              className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
            >
              {t('gm_tools')}
            </button>
          )}
        </div>
      </div>
      {isGM && (
        <div className="bg-[#322018]/90 flex justify-center gap-2 py-2">
          <button
            className={`px-4 py-1 rounded-2xl font-dnd ${tab === 'game' ? 'bg-dndgold text-dndred' : 'bg-[#1b110a] text-dndgold'}`}
            onClick={() => setTab('game')}
          >
            {t('game_field')}
          </button>
          <button
            className={`px-4 py-1 rounded-2xl font-dnd ${tab === 'panel' ? 'bg-dndgold text-dndred' : 'bg-[#1b110a] text-dndgold'}`}
            onClick={() => setTab('panel')}
          >
            {t('gm_panel')}
          </button>
        </div>
      )}

      {(!isGM || tab === 'game') && (
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
          <GMTableView players={players} isGM={isGM} />
          <InitiativeList initiative={initiative} />
        </div>
        {/* Нижня панель */}
        <div
          className={`md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2 z-20 mt-4 md:mt-0 flex flex-wrap gap-4 ${isGM ? 'justify-center items-end md:w-auto w-full' : 'justify-center w-full'}`}
        >
          {isGM ? (
            <>
              <ChatComponent tableId={tableId} user={user} messages={messages} socket={socket} />
              <GMControlPanel />
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
      )}

      {isGM && tab === 'panel' && (
        <div className="p-4 bg-[#1b110a]/80 rounded-b-2xl h-[80vh] overflow-auto">
          <GMTools tableId={tableId} />
        </div>
      )}
      <div className="p-4 bg-[#322018]/90 text-center font-dnd text-dndgold rounded-b-2xl">
        © {new Date().getFullYear()} D&D Online Tabletop
      </div>
    </div>
    </GameStateProvider>
  );
}
