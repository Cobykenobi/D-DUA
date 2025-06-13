import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/user';
import LogoutButton from '../components/LogoutButton';

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function LobbyPage() {
  const [searchParams] = useSearchParams();
  const { user } = useUserStore();
  const [tableId, setTableId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isGM, setIsGM] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const char = searchParams.get('char');

  // generate tableId on mount
  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 8);
    setTableId(id);
  }, []);

  useEffect(() => {
    if (!tableId || !user) {
      if (!tableId) setError('Не вдалося отримати код столу');
      return;
    }
    setError('');
    socket.emit('join-lobby', { tableId, user, characterId: char });
    socket.on('lobby-players', data => setPlayers(data.players));
    socket.on('gm-assigned', () => setIsGM(true));
    socket.on('game-started', () => navigate(`/table/${tableId}`));
    return () => socket.disconnect();
  }, [tableId, user, char, navigate]);

  const startGame = () => {
    if (tableId) socket.emit('start-game', { tableId });
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen bg-dndbg bg-cover bg-center"
      style={{ backgroundImage: "url('/nd-bg.png')" }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => navigate('/profile')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition"
        >
          Назад
        </button>
        <LogoutButton />
      </div>
      <div className="bg-[#322018]/90 p-6 rounded-2xl mt-10 w-full max-w-lg">
        <h1 className="text-3xl font-dnd text-dndgold text-center mb-2">Лобі столу</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="text-dndgold mb-2">Код для підключення: <b>{tableId}</b></div>
        <div className="text-dndgold mb-4">Гравці:</div>
        <ul>
          {players.map(pl => (
            <li key={pl.user} className="text-dndgold">
              {pl.character?.name || pl.user}
              {pl.role === "gm" ? "(GM)" : ""}
            </li>
          ))}
        </ul>
        {isGM && (
          <button className="bg-dndgold mt-6 rounded-2xl px-6 py-2 font-dnd" onClick={startGame}>
            Розпочати гру!
          </button>
        )}
      </div>
    </div>
  );
}
