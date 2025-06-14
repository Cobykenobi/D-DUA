import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/user';
import LogoutButton from '../components/LogoutButton';
import { getCharacter } from '../utils/api';
import { withApiHost } from '../utils/imageUtils';
import { useTranslation } from 'react-i18next';

// Fallback to localhost if env variable is missing
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function LobbyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUserStore();
  const tableParam = searchParams.get('tableId');
  const [tableId, setTableId] = useState(tableParam || null);
  const [inputId, setInputId] = useState(tableParam || '');
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


  // tableId is taken from URL if provided

  useEffect(() => {
    if (!tableId || !user) {
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

  const handleJoin = () => {
    let id = inputId.trim();
    if (!id) {
      id = Math.random().toString(36).substring(2, 8);
    }
    setTableId(id);
    navigate(`/lobby?tableId=${id}${char ? `&char=${char}` : ''}`);
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
      {!tableId ? (
        <div className="bg-[#322018]/90 p-6 rounded-2xl mt-10 w-full max-w-lg text-center">
          <h1 className="text-3xl font-dnd text-dndgold mb-4">Вхід до лобі</h1>
          <input
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Код столу"
            className="w-full p-2 rounded bg-[#3c2a20] text-dndgold mb-4"
          />
          <button
            onClick={handleJoin}
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-6 py-2 transition active:scale-95"
          >
            Приєднатися / Створити
          </button>
          <div className="text-dndgold text-sm mt-2">Залиште поле порожнім, щоб створити нове лобі</div>
        </div>
      ) : (
      <div className="bg-[#322018]/90 p-6 rounded-2xl mt-10 w-full max-w-lg">
        <h1 className="text-3xl font-dnd text-dndgold text-center mb-2">Лобі столу</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="text-dndgold mb-2">
          Код для підключення: <b>{tableId}</b>
          <div className="text-sm">Поділися цим кодом або посиланням /lobby?tableId={tableId}</div>
        </div>
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
                {character.race?.code ? t(`races.${character.race.code}`) : (character.race?.name || '')} &middot;{' '}
                {character.profession?.code ? t(`classes.${character.profession.code}`) : (character.profession?.name || '')}
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
                      <> – {pl.character.race.code ? t(`races.${pl.character.race.code}`) : (pl.character.race.name || '')}</>
                    )}
                    {pl.character.profession && (
                      <> / {pl.character.profession.code ? t(`classes.${pl.character.profession.code}`) : (pl.character.profession.name || '')}</>
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
      )}
    </div>
  );
}
