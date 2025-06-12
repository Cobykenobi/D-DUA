import React, { useEffect, useState } from "react";
import AdminStats from "./AdminStats";

export default function AdminPanel() {
  const [raceStats, setRaceStats] = useState([]);

  useEffect(() => {
    const data = [
      { race: "Ельф", count: 4 },
      { race: "Гном", count: 2 },
      { race: "Людина", count: 5 },
    ];
    setRaceStats(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Статистика рас</h1>
      <AdminStats data={raceStats} />
    </div>
  );
}
