import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useUserStore } from '../../store/user';
import { GameStateProvider, useGameState } from '../../context/GameStateContext';
import PlayerStatusTable from '../../components/PlayerStatusTable';
import InventoryEditor from '../../components/InventoryEditor';
import DiceBox from '../../components/DiceBox';
import socket from '../../api/socket';
import api from '../../api/axios';

function Control() {
  const { updateMap, changeMusic, music } = useGameState();
  const [mapUrl, setMapUrl] = useState('');
  const [trackUrl, setTrackUrl] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedChar, setSelectedChar] = useState('');
  const [inventory, setInventory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const onPlayers = (data) => setPlayers(data.players || []);
    socket.on('table-players', onPlayers);
    const onInv = ({ characterId, inventory }) => {
      setPlayers(ps => ps.map(p => (
        p.character && p.character._id === characterId
          ? { ...p, character: { ...p.character, inventory } }
          : p
      )));
      if (selectedChar === characterId) setInventory(inventory);
    };
    socket.on('inventory-update', onInv);
    const onInvAll = data => {
      setPlayers(ps => ps.map(p => (
        p.character && data[p.character._id]
          ? { ...p, character: { ...p.character, inventory: data[p.character._id] } }
          : p
      )));
      if (selectedChar && data[selectedChar]) setInventory(data[selectedChar]);
    };
    socket.on('inventory-update-all', onInvAll);
    return () => {
      socket.off('table-players', onPlayers);
      socket.off('inventory-update', onInv);
      socket.off('inventory-update-all', onInvAll);
    };
  }, [id, selectedChar]);

  useEffect(() => {
    if (players.length && !selectedChar) {
      const first = players.find(p => p.character);
      if (first) setSelectedChar(first.character._id);
    }
  }, [players, selectedChar]);

  useEffect(() => {
    if (!selectedChar) return;
    const fetchInv = async () => {
      try {
        const res = await api.get(`/inventory/${selectedChar}`);
        const data = res.data?.items || [];
        setInventory(data.map(it => ({ item: it.name || it.item || it, type: it.type || 'misc' })));
      } catch (err) {
        setInventory([]);
      }
    };
    fetchInv();
  }, [selectedChar]);

  const sendMap = () => {
    if (mapUrl) {
      updateMap(mapUrl);
      setMapUrl('');
    }
  };

  const sendMusic = () => {
    if (trackUrl) {
      changeMusic(trackUrl);
      setTrackUrl('');
    }
  };

  const handleInventoryChange = async (items) => {
    setInventory(items);
    if (!selectedChar) return;
    await api.put(`/inventory/${selectedChar}`, {
      items: items.map(it => ({ name: it.item, type: it.type }))
    });
    socket.emit('inventory-update', { tableId: id, characterId: selectedChar, inventory: items });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <div className="font-bold mb-1">Карта</div>
        <input
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder="URL карти"
        />
        <button onClick={sendMap} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          Оновити карту
        </button>
      </div>
      <div>
        <div className="font-bold mb-1">Музика (YouTube URL)</div>
        <input
          value={trackUrl}
          onChange={(e) => setTrackUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder="https://..."
        />
        <button onClick={sendMusic} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full mb-2">
          Відтворити
        </button>
        {music && <ReactPlayer url={music} playing controls width="100%" height="50px" />}
      </div>
      <PlayerStatusTable players={players} isGM />
      <div>
        <div className="font-bold mb-1">Інвентар</div>
        <select
          className="rounded px-2 py-1 w-full text-black mb-2"
          value={selectedChar}
          onChange={e => setSelectedChar(e.target.value)}
        >
          {players.filter(p => p.character).map(p => (
            <option key={p.character._id} value={p.character._id}>{p.name}</option>
          ))}
        </select>
        <InventoryEditor inventory={inventory} onChange={handleInventoryChange} />
      </div>
      <DiceBox />
    </div>
  );
}

export default function GMControlPage() {
  const { id } = useParams();
  const { user } = useUserStore();
  return (
    <GameStateProvider tableId={id} user={user}>
      <div className="min-h-screen bg-dndbg text-dndgold font-dnd flex justify-center items-start pt-4">
        <Control />
      </div>
    </GameStateProvider>
  );
}
