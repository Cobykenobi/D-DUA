import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/user';
import LogoutButton from '../components/LogoutButton';
import { getCharacter } from '../utils/api';
import { withApiHost } from '../utils/imageUtils';
import { useTranslation } from 'react-i18next';

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function LobbyPage() {
  const [searchParams] = useSearchParams();
  const { user } = useUserStore();
  const [tableId, setTableId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gm, setGm] = useState(null);
  const [character, setCharacter] = useState(null);
  const [isGM, setIsGM] = useState(user?.role === 'master');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const char = searchParams.get('char');

  useEffect(() => {
    if (!char) return;
    getCharacter(char).then(setCharacter).catch(() => {});
  }, [char]);

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
    socket.on('lobby-players', data => {
      setPlayers(data.players);
      setGm(data.gm || null);
      if (user) {
        setIsGM(user.role === 'master' || (data.gm && data.gm.toString() === user._id));
      }
    });
    socket.on('gm-assigned', () => {
      setIsGM(true);
      setGm(user?._id);
    });
    socket.on('game-started', () => navigate(`/table/${tableId}`));
    return () => socket.disconnect();
  }, [tableId, user, char, navigate]);

  useEffect(() => {
    if (!user) return;
    setIsGM(user.role === 'master' || (gm && gm.toString() === user._id));
  }, [user, gm]);

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
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          Назад
        </button>
        <LogoutButton />
      </div>
      <div className="bg-[#322018]/90 p-6 rounded-2xl mt-10 w-full max-w-lg">
        <h1 className="text-3xl font-dnd text-dndgold text-center mb-2">Лобі столу</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="text-dndgold mb-2">Код для підключення: <b>{tableId}</b></div>
        {character && (
          <div className="flex items-center gap-3 mb-4 text-dndgold">
            <img
              src={withApiHost(character.image) || '/default-avatar.png'}
              alt={character.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div>
              <div className="font-bold">{character.name}</div>
              <div className="text-sm">
                {t('races.' + (character.race?.name || '')) || character.race?.name} &middot;{' '}
                {t('classes.' + (character.profession?.name || '')) || character.profession?.name}
              </div>
            </div>
          </div>
        )}
        <div className="text-dndgold mb-4">Гравці:</div>
        <ul>
          {players.map(pl => (
            <li key={pl.user} className="text-dndgold mb-2">
              <div className="font-bold">
                {pl.name} {pl.user === gm && ' (Мастер)'}
              </div>
              <div className="ml-2">
                {pl.character ? (
                  <>
                    {pl.character.name}
                    {pl.character.race && (
                      <> – {t('races.' + (pl.character.race?.name || '')) || pl.character.race?.name}</>
                    )}
                    {pl.character.profession && (
                      <> / {t('classes.' + (pl.character.profession?.name || '')) || pl.character.profession?.name}</>
                    )}
                  </>
                ) : (
                  <>{t('Без персонажа')}</>
                )}
              </div>
            </li>
          ))}
        </ul>
        {isGM && (
          <button
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-6 py-2 mt-6 transition active:scale-95"
          onClick={startGame}
          >
            Розпочати гру!
          </button>
        )}
      </div>
    </div>
  );
}
