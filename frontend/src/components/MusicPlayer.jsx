import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useUserStore } from '../store/user';

export default function MusicPlayer({ isGM, className = '' }) {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);
  const [volume, setVolume] = useState(() => {
    const stored = localStorage.getItem('music-volume');
    return stored ? Number(stored) : 0.5;
  });
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const fetchTracks = async () => {
    try {
      const res = await api.get('/music');
      setTracks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const addTrack = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    try {
      await api.post('/music', { title, url });
      setTitle('');
      setUrl('');
      fetchTracks();
    } catch (e) {
      console.error(e);
    }
  };

  const removeTrack = async (id) => {
    try {
      await api.delete(`/music/${id}`);
      if (current && current._id === id) setCurrent(null);
      fetchTracks();
    } catch (e) {
      console.error(e);
    }
  };

  const changeVolume = (v) => {
    setVolume(v);
    localStorage.setItem('music-volume', v);
  };

  return (
    <div className={`bg-[#25160f]/80 rounded-2xl p-4 mb-4 text-dndgold ${className}`}>
      <div className="font-dnd text-xl mb-2">Музика</div>
      {current && (
        <ReactPlayer url={current.url} playing controls={true} volume={volume} width="100%" height="50px" />
      )}
      <div className="flex items-center gap-2 my-2">
        <span className="text-sm">Гучність</span>
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => changeVolume(parseFloat(e.target.value))} />
      </div>
      <ul className="divide-y divide-dndgold/20 max-h-32 overflow-y-auto text-sm">
        {tracks.map(track => (
          <li key={track._id} className="flex justify-between items-center py-1">
            <button onClick={() => setCurrent(track)} className="hover:underline flex-1 text-left">
              {track.title}
            </button>
            {isGM && (
              <button onClick={() => removeTrack(track._id)} className="text-dndred ml-2">✕</button>
            )}
          </li>
        ))}
      </ul>
      {isGM && (
        <form onSubmit={addTrack} className="mt-2 flex flex-col gap-1">
          <input
            className="rounded px-2 py-1 text-black"
            placeholder="Назва"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="rounded px-2 py-1 text-black"
            placeholder="URL/YouTube"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded px-2 py-1">Додати</button>
        </form>
      )}
    </div>
  );
}
