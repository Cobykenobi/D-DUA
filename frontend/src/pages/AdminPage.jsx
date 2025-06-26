import React, { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import { useNavigate } from "react-router-dom";
import { useAppearance } from '../context/AppearanceContext';
import { useTranslation } from 'react-i18next';
import {
  setMusic,
  createRace,
  getRaces,
  uploadMap,
  deleteRace,
  startSession,
  endSession,
  getSessionLog,
} from "../api/adminActions";

export default function AdminPage() {
  const [videoId, setVideoId] = useState(null);
  const [races, setRaces] = useState([]);
  const [log, setLog] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getRaces().then((res) => {
      const url = res.data?.url || "";
      const id = url.split("v=")[1]?.split("&")[0] || null;
      setVideoId(id);
      setRaces(res.data);
    });
    getSessionLog().then((res) => setLog(res.data));
  }, []);

  const refreshRaces = async () => {
    const updated = await getRaces();
    setRaces(updated.data);
  };

  const handleSetMusic = async () => {
    const url = prompt(t('youtube_link_prompt'));
    if (url) {
      await setMusic(url);
      const id = url.split("v=")[1]?.split("&")[0] || null;
      setVideoId(id);
    }
  };

  const handleCreateRace = async () => {
    const name = prompt(t('race_name_prompt'));
    if (name) {
      await createRace({ name });
      refreshRaces();
    }
  };

  const handleUploadMap = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("map", file);
      await uploadMap(formData);
    };
    input.click();
  };

  const handleDeleteRace = async (id) => {
    if (window.confirm(t('confirm_delete_race'))) {
      await deleteRace(id);
      refreshRaces();
    }
  };

  const handleStartSession = async () => {
    await startSession();
    alert(t('session_started'));
  };

  const handleEndSession = async () => {
    await endSession();
    alert(t('session_ended'));
  };

  const { background } = useAppearance();
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 font-dnd text-white"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <h1 className="text-3xl text-dndgold mb-6">{t('admin_page_title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AdminCard title={t('set_music')} onClick={handleSetMusic} />
        <AdminCard title={t('create_new_race')} onClick={handleCreateRace} />
        <AdminCard title={t('upload_map')} onClick={handleUploadMap} />
        <AdminCard title={t('users')} onClick={() => navigate('/admin/users')} />
        <AdminCard title={t('appearance')} onClick={() => navigate('/admin/appearance')} />
        <AdminCard title={t('start_session')} onClick={handleStartSession} />
        <AdminCard title={t('end_session')} onClick={handleEndSession} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-dndgold mb-2">{t('race_list')}</h2>
        <ul className="list-disc pl-6 text-base space-y-1">
          {races.map((r) => (
            <li key={r._id} className="flex justify-between items-center">
              {r.name}
              <button onClick={() => handleDeleteRace(r._id)} className="ml-2 text-red-500 hover:underline">
                {t('delete')}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {log.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-dndgold mb-2">{t('event_log')}</h2>
          <ul className="list-disc pl-6 text-base space-y-1">
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
