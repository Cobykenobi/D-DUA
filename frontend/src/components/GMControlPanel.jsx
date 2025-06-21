import { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import DiceBox from './DiceBox';
import { useGameState } from '../context/GameStateContext';

export default function GMControlPanel() {
  const { updateMap, changeMusic } = useGameState();
  const [mapUrl, setMapUrl] = useState('');
  const [track, setTrack] = useState('');

  const sendMap = () => {
    if (!mapUrl) return;
    updateMap(mapUrl);
    setMapUrl('');
  };

  const sendMusic = () => {
    if (!track) return;
    changeMusic(track);
    setTrack('');
  };

  return (
    <div className="p-4 bg-[#25160f]/80 rounded-2xl text-dndgold flex flex-col gap-4 w-60">
      <div>
        <div className="font-bold mb-1">Карта</div>
        <input
          value={mapUrl}
          onChange={e => setMapUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder="URL карти"
        />
        <button onClick={sendMap} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          Оновити карту
        </button>
      </div>
      <div>
        <div className="font-bold mb-1">Музика</div>
        <input
          value={track}
          onChange={e => setTrack(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder="URL треку"
        />
        <button onClick={sendMusic} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          Відтворити
        </button>
      </div>
      <MusicPlayer isGM className="w-full" />
      <DiceBox />
    </div>
  );
}
