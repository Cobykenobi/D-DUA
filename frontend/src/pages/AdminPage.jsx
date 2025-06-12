import React, { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
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
    const url = prompt("Вставте YouTube посилання:");
    if (url) {
      await setMusic(url);
      const id = url.split("v=")[1]?.split("&")[0] || null;
      setVideoId(id);
    }
  };

  const handleCreateRace = async () => {
    const name = prompt("Назва раси:");
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
    if (window.confirm("Ви впевнені, що хочете видалити цю расу?")) {
      await deleteRace(id);
      refreshRaces();
    }
  };

  const handleStartSession = async () => {
    await startSession();
    alert("Сесія запущена");
  };

  const handleEndSession = async () => {
    await endSession();
    alert("Сесію завершено");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 font-dnd text-white"
      style={{ backgroundImage: "url('/map-bg.jpg')" }}
    >
      <h1 className="text-3xl text-dndgold mb-6">Панель Майстра</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AdminCard title="Встановити музику" onClick={handleSetMusic} />
        <AdminCard title="Створити нову расу" onClick={handleCreateRace} />
        <AdminCard title="Завантажити карту" onClick={handleUploadMap} />
        <AdminCard title="Запустити сесію" onClick={handleStartSession} />
        <AdminCard title="Завершити сесію" onClick={handleEndSession} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-dndgold mb-2">Список рас</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {races.map((r) => (
            <li key={r._id} className="flex justify-between items-center">
              {r.name}
              <button onClick={() => handleDeleteRace(r._id)} className="ml-2 text-red-500 hover:underline">
                Видалити
              </button>
            </li>
          ))}
        </ul>
      </div>

      {log.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-dndgold mb-2">Журнал подій</h2>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
