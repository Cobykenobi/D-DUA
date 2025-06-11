import React from "react";
import AdminCard from "../components/AdminCard";

export default function AdminPage() {
  const handleRaceManage = () => {
    console.log("Керування расами — ще не реалізовано");
    // TODO: fetch('/api/race') або navigate('/admin/races')
  };

  const handleMapUpload = () => {
    console.log("Завантаження карти — ще не реалізовано");
    // TODO: реалізувати upload input
  };

  const handleMusicControl = () => {
    console.log("Керування музикою — ще не реалізовано");
    // TODO: fetch('/api/music') або navigate('/admin/music')
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <h1 className="text-3xl font-dnd text-dndgold">Панель Майстра</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <AdminCard title="Керувати расами" onClick={handleRaceManage} />
        <AdminCard title="Завантажити карту" onClick={handleMapUpload} />
        <AdminCard title="Фонова музика" onClick={handleMusicControl} />
      </div>
    </div>
  );
}
