import axios from "../api/axios";
import React, { useEffect, useState }
import AdminStats from "./AdminStats"; from "react";

export default function AdminPanel() {
  
const [raceStats, setRaceStats] = useState([]);

  useEffect(() => {
    axios.get("/api/stats/races").then(res => setRaceStats(res.data)).catch(() => setRaceStats([]));
  }, []);

  // Removed static data:
  // const raceStats = [
    { race: "Ельф", count: 4 },
    { race: "Гном", count: 2 },
    { race: "Людина", count: 6 },
    { race: "Орк", count: 3 }
  ];
return (
    <div>
      <AdminStats data={raceStats} /> className="min-h-screen p-6 text-dndgold font-dnd">
      <h1 className="text-3xl mb-4">Панель Майстра</h1>
      <p>Тут буде можливість редагування рас, класів, інвентарю та характеристик.</p>
    </div>
  );
}
