import React, { useRef, useEffect, useState } from 'react';

// Підтримує YouTube через iframe або звичайний <audio src="url" />
export default function MusicPlayer({ url, volume, onVolume, title }) {
  const [localVolume, setLocalVolume] = useState(volume ?? 70);
  const audioRef = useRef();
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = localVolume / 100;
  }, [localVolume]);

  useEffect(() => {
    if (typeof onVolume === 'function') onVolume(localVolume);
  }, [localVolume]);

  if (!url) return <div className="text-dndgold/70 font-dnd">Музика не вибрана</div>;

  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
  return (
    <div className="w-full flex flex-col items-center">
      <div className="font-dnd text-dndgold mb-1">{title}</div>
      {isYoutube ? (
        <iframe
          width="260" height="52"
          src={url.replace('watch?v=', 'embed/') + '?autoplay=1'}
          title="YouTube player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <audio ref={audioRef} src={url} autoPlay loop controls className="w-full rounded-xl" />
      )}
      <input
        type="range"
        min="0" max="100"
        value={localVolume}
        onChange={e => setLocalVolume(Number(e.target.value))}
        className="w-2/3 mt-2"
      />
      <div className="text-xs text-dndgold/60">Гучність: {localVolume}%</div>
    </div>
  );
}
