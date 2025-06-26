import api from '../../api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
export default function AdminMusicPage() {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchTracks = async () => {
    setLoading(true);
    const res = await api.get('/music');
    setTracks(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchTracks(); }, []);

  const addTrack = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    await api.post('/music', { title, url });
    setTitle(''); setUrl(''); fetchTracks();
  };

  const removeTrack = async (id) => {
    await api.delete(`/music/${id}`);
    fetchTracks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">{t('admin_music')}</h1>
        <form className="flex gap-2 mb-6 items-center" onSubmit={addTrack}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder={t('track_name')}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="YouTube/URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 transition active:scale-95">{t('add')}</button>
        </form>
        {loading ? <div className="text-center text-dndgold">{t('loading')}</div> : (
          <ul className="divide-y divide-dndgold/20 max-h-64 overflow-y-auto">
            {tracks.map(track => (
              <li key={track._id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-dnd text-dndgold">{track.title}</div>
                  {track.url && <a href={track.url} target="_blank" rel="noopener noreferrer" className="text-xs text-dndgold/80 underline">{t('listen')}</a>}
                </div>
                <button onClick={() => removeTrack(track._id)} className="text-dndred hover:underline ml-2">{t('delete')}</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← {t('back')}</Link>
      </div>
    </div>
  );
}
