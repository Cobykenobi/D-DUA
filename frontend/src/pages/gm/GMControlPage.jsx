import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useUserStore } from '../../store/user';
import { GameStateProvider, useGameState } from '../../context/GameStateContext';
import PlayerStatusTable from '../../components/PlayerStatusTable';
import DiceBox from '../../components/DiceBox';
import DiceRollerHidden from '../../components/DiceRollerHidden';
import socket from '../../api/socket';

function Control() {
  const { updateMap, changeMusic, music } = useGameState();
  const [mapUrl, setMapUrl] = useState('');
  const [trackUrl, setTrackUrl] = useState('');
  const [players, setPlayers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const onPlayers = (data) => setPlayers(data.players || []);
    socket.on('table-players', onPlayers);
    return () => {
      socket.off('table-players', onPlayers);
    };
  }, [id]);

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
        <Control />
      </div>
    </GameStateProvider>
  );
}
