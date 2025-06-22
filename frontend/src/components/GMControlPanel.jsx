import { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import DiceBox from './DiceBox';
import { useGameState } from '../context/GameStateContext';
import { useTranslation } from 'react-i18next';

export default function GMControlPanel() {
  const { updateMap, changeMusic } = useGameState();
  const { t } = useTranslation();
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
        <div className="font-bold mb-1">{t('map')}</div>
        <input
          value={mapUrl}
          onChange={e => setMapUrl(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder={t('map_url')}
        />
        <button onClick={sendMap} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          {t('update_map')}
        </button>
      </div>
      <div>
        <div className="font-bold mb-1">{t('music')}</div>
        <input
          value={track}
          onChange={e => setTrack(e.target.value)}
          className="rounded px-2 py-1 w-full text-black mb-2"
          placeholder={t('track_url')}
        />
        <button onClick={sendMusic} className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 w-full">
          {t('play')}
        </button>
      </div>
      <MusicPlayer isGM className="w-full" />
      <DiceBox />
    </div>
  );
}
