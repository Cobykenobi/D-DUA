import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../api/socket';

const GameStateContext = createContext();

export function GameStateProvider({ tableId, user, children }) {
  const [map, setMap] = useState('');
  const [hp, setHp] = useState({});
  const [music, setMusic] = useState(null);

  useEffect(() => {
    if (!tableId || !user) return;
    socket.emit('join-table', { tableId, user });
    const onMap = (m) => setMap(m);
    const onHpAll = (data) => setHp(data || {});
    const onHp = ({ userId, hp: val }) => setHp(h => ({ ...h, [userId]: val }));
    const onMusic = (track) => setMusic(track);
    socket.on('map-update', onMap);
    socket.on('hp-update-all', onHpAll);
    socket.on('player-hp-update', onHp);
    socket.on('music-change', onMusic);
    return () => {
      socket.off('map-update', onMap);
      socket.off('hp-update-all', onHpAll);
      socket.off('player-hp-update', onHp);
      socket.off('music-change', onMusic);
      socket.disconnect();
    };
  }, [tableId, user]);

  const updateMap = (m) => socket.emit('map-update', { tableId, map: m });
  const updateHp = (uid, val) => socket.emit('player-hp-update', { tableId, userId: uid, hp: val });
  const changeMusic = (track) => socket.emit('music-change', { tableId, track });

  return (
    <GameStateContext.Provider value={{ map, hp, music, updateMap, updateHp, changeMusic }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
