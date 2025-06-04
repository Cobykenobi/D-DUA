import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import MapViewer from '../components/MapViewer';
import DiceRoller from '../components/DiceRoller';
import MusicPlayer from '../components/MusicPlayer';
import CharacterCard from '../components/CharacterCard';
import ChatBox from '../components/ChatBox';
import BrightnessControl from '../components/BrightnessControl';
import axios from 'axios';

export default function GameTablePage() {
  const { user, token } = useUserStore();
  const [session, setSession] = useState(null);
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [activeMap, setActiveMap] = useState(null);
  const [activeMusic, setActiveMusic] = useState(null);
  const [brightness, setBrightness] = useState(100);

  // Завантаження даних сесії
  useEffect(() => {
    const fetchSession = async () => {
      const res = await axios.get('/api/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sess = res.data[0]; // вибираємо першу доступну (або можна з url)
      setSession(sess);
      setPlayers(sess?.players || []);
      setActiveMap(sess?.activeMap || null);
      setActiveMusic(sess?.activeMusic || null);
    };
    fetchSession();
  }, [token]);

  // Завантаження персонажів для всіх гравців
  useEffect(() => {
    const fetchCharacters = async () => {
      if (!players.length) return;
      const res = await axios.get('/api/characters', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCharacters(res.data);
    };
    fetchCharacters();
  }, [players, token]);

  // Отримати поточного персонажа за id гравця
  const getCharacter = (playerId) => characters.find(c => c.owner === playerId);

  // Знайти персонажа для себе
  const myCharacter = characters.find(c => c.owner === user._id);

  return (
    <div
      className="min-h-screen flex flex-col bg-dndbg"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      <div className="flex justify-between items-center p-4 bg-[#322018]/90">
        <Link to="/" className="font-dnd text-dndgold text-xl">← На головну</Link>
        <div className="font-dnd text-dndgold text-xl">D&D Online Tabletop</div>
        <div className="flex items-center gap-4">
          <BrightnessControl value={brightness} onChange={setBrightness} />
          <span className="font-dnd text-dndgold">{user?.username}</span>
        </div>
      </div>
      <div className="flex flex-1 h-[80vh]">
        {/* Ліва панель: карточки гравців */}
        <div className="w-1/5 p-2 space-y-2 bg-[#25160f]/80 overflow-y-auto">
          <div className="font-dnd text-dndgold text-lg mb-2">Гравці</div>
          {players.slice(0, 3).map(p => (
            <PlayerCard
              key={p._id}
              player={p}
              character={getCharacter(p._id)}
              active={p._id === user._id}
            />
          ))}
        </div>
        {/* Центральна частина: карта / кубики / музика / персонаж / чат */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#20100a]/70">
          <div className="w-full h-[46vh] flex items-center justify-center rounded-2xl shadow-dnd bg-[#160b06]/90 mb-3">
            <MapViewer mapUrl={activeMap?.image} name={activeMap?.name} />
          </div>
          <div className="w-full flex justify-center gap-8 mb-3">
            <DiceRoller token={token} sessionId={session?._id} isMaster={user?.role === 'master' || user?.role === 'admin'} />
          </div>
          {/* Мій персонаж (під картою) */}
          <div className="w-full max-w-2xl">
            {myCharacter && <CharacterCard character={myCharacter} />}
          </div>
          {/* Музика та чат */}
          <div className="w-full max-w-md mx-auto mb-2">
            <MusicPlayer url={activeMusic?.url} title={activeMusic?.title} />
          </div>
          <div className="w-full max-w-md mx-auto mb-4">
            {session && <ChatBox sessionId={session._id} />}
          </div>
        </div>
        {/* Права панель: карточки гравців */}
        <div className="w-1/5 p-2 space-y-2 bg-[#25160f]/80 overflow-y-auto">
          <div className="font-dnd text-dndgold text-lg mb-2">Гравці</div>
          {players.slice(3).map(p => (
            <PlayerCard
              key={p._id}
              player={p}
              character={getCharacter(p._id)}
              active={p._id === user._id}
            />
          ))}
        </div>
      </div>
      {/* Футер: */}
      <div className="p-4 bg-[#322018]/90 text-center font-dnd text-dndgold">
        © {new Date().getFullYear()} D&D Online Tabletop
      </div>
    </div>
  );
}
