import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import AdminStats from "./AdminStats";

export default function AdminPanel() {
  const [raceStats, setRaceStats] = useState([]);

  useEffect(() => {
    axios
      .get("/stats/races")
      .then((res) => setRaceStats(res.data))
      .catch(() => setRaceStats([]));
  }, []);

  return (
    <div className="min-h-screen p-6 text-dndgold font-dnd">
      <h1 className="text-3xl mb-4">Панель Майстра</h1>
      <AdminStats data={raceStats} />
      <p>Тут буде можливість редагування рас, класів, інвентарю та характеристик.</p>
    </div>
  );
}
