import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../api/socket';

const GameStateContext = createContext();

export function GameStateProvider({ tableId, user, children }) {
  const [map, setMap] = useState('');
  const [hp, setHp] = useState({});
  const [mp, setMp] = useState({});
  const [music, setMusic] = useState(null);

  useEffect(() => {
    if (!tableId || !user) return;
    socket.emit('join-table', { tableId, user });
    const onMap = (m) => setMap(m);
    const onHpAll = (data) => setHp(data || {});
    const onHp = ({ userId, hp: val }) => setHp(h => ({ ...h, [userId]: val }));
    const onMpAll = (data) => setMp(data || {});
    const onMp = ({ userId, mp: val }) => setMp(m => ({ ...m, [userId]: val }));
    const onMusic = (track) => setMusic(track);
    socket.on('map-update', onMap);
    socket.on('hp-update-all', onHpAll);
    socket.on('player-hp-update', onHp);
    socket.on('mp-update-all', onMpAll);
    socket.on('player-mp-update', onMp);
    socket.on('music-change', onMusic);
    return () => {
      socket.off('map-update', onMap);
      socket.off('hp-update-all', onHpAll);
      socket.off('player-hp-update', onHp);
      socket.off('mp-update-all', onMpAll);
      socket.off('player-mp-update', onMp);
      socket.off('music-change', onMusic);
      socket.disconnect();
    };
  }, [tableId, user]);

  const updateMap = (m) => socket.emit('map-update', { tableId, map: m });
  const updateHp = (uid, val) => socket.emit('player-hp-update', { tableId, userId: uid, hp: val });
  const updateMp = (uid, val) => socket.emit('player-mp-update', { tableId, userId: uid, mp: val });
  const changeMusic = (track) => socket.emit('music-change', { tableId, track });

  return (
    <GameStateContext.Provider value={{ map, hp, mp, music, updateMap, updateHp, updateMp, changeMusic }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
