import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { useUserStore } from '../../store/user';
import { GameStateProvider, useGameState } from '../../context/GameStateContext';
import PlayerStatusTable from '../../components/PlayerStatusTable';
import DiceBox from '../../components/DiceBox';
import DiceRollerHidden from '../../components/DiceRollerHidden';
import InventoryEditor from '../../components/InventoryEditor';
import { withApiHost } from '../../utils/imageUtils';
import socket from '../../api/socket';
import api from '../../api/axios';
import { withApiHost } from '../../utils/imageUtils';


function Control({ tableId }) {
  const { updateMap, changeMusic, music } = useGameState();
  const [mapUrl, setMapUrl] = useState('');
  const [mapFile, setMapFile] = useState(null);
  const [trackUrl, setTrackUrl] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [inventory, setInventory] = useState([]);

  const [target, setTarget] = useState('all');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const params = useParams();
  const id = tableId || params.tableId || params.id;
  const navigate = useNavigate();

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

  const kickPlayer = (uid) => {
    socket.emit('kick-player', { tableId: id, userId: uid });
  };

  const editPlayer = (p) => {
    if (p.character && p.character._id) {
      navigate(`/characters/${p.character._id}/edit`);
    }
  };

  const sendMap = async () => {
    if (mapUrl) {
      updateMap(mapUrl);
      setMapUrl('');
      return;
    }
    if (mapFile) {
      const formData = new FormData();
      formData.append('name', mapFile.name || 'map');
      formData.append('image', mapFile);
      try {
        const res = await api.post('/map', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const image = withApiHost(res.data.image);
        updateMap(image);
        setMapFile(null);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sendMusic = () => {
    if (trackUrl) {
      changeMusic(trackUrl);
      setTrackUrl('');
    }
  };

  const updateInventory = async (items) => {
    setInventory(items);
    socket.emit('inventory-update', {
      tableId: id,
      characterId: selectedChar,
      inventory: items,
    });
    try {
      await api.put(`/inventory/${selectedChar}`, {
        items: items.map((it) => ({ name: it.item, type: it.type })),
      });
    } catch (err) {
      // ignore error; optimistic update via socket
    }
  };


  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit('gm-message', { tableId: id, targetUserId: target, text: message });
    setMessage('');

  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <div className="font-bold mb-1">{t('map')}</div>
        <input
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder={t('map_url')}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMapFile(e.target.files[0])}
          className="rounded px-2 py-1 w-full text-black mb-2"
        />
        <button onClick={sendMap} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          {t('update_map')}
        </button>
      </div>
      <div>
        <div className="font-bold mb-1">{t('music_url')}</div>
        <input
          value={trackUrl}
          onChange={(e) => setTrackUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder="https://..."
        />
        <button onClick={sendMusic} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full mb-2">
          {t('play')}
        </button>
        {music && <ReactPlayer url={music} playing controls width="100%" height="50px" />}
      </div>

      <PlayerStatusTable players={players} isGM onEdit={editPlayer} onKick={kickPlayer} />

      {players.some(p => p.character) && (
        <div>
          <div className="font-bold mb-1">{t('inventory.title')}</div>
          <select
            value={selectedChar || ''}
            onChange={e => setSelectedChar(e.target.value)}
            className="rounded px-2 py-1 w-full text-black mb-2"
          >
            {players.filter(p => p.character).map(p => (
              <option key={p.character._id} value={p.character._id}>
                {p.character.name}
              </option>
            ))}
          </select>
          {selectedChar && (
            <InventoryEditor inventory={inventory} onChange={updateInventory} />
          )}
        </div>
      )}

      <div>

        <div className="font-bold mb-1">{t('message')}</div>
        <select
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
        >
          <option value="all">{t('all')}</option>
          {Array.isArray(players) && players.map(p => (
            <option key={p.user} value={p.user}>{p.name}</option>
          ))}
        </select>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder={t('message_text')}
        />
        <button onClick={sendMessage} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          {t('send')}
        </button>

      </div>
      <DiceBox />
      <DiceRollerHidden sessionId={id} />
    </div>
  );
}

export default function GMControlPage() {
  const { id } = useParams();
  const { user } = useUserStore();
  return (
    <GameStateProvider tableId={id} user={user}>
      <div className="min-h-screen bg-dndbg text-dndgold font-dnd flex justify-center items-start pt-4">
        <Control tableId={id} />
      </div>
    </GameStateProvider>
  );
}

export { Control as GMTools };
