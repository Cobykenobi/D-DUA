import React, { useEffect, useState } from "react";
import { getRaces, getSessionLog } from "../api/adminActions";

function AdminPage() {
  const [races, setRaces] = useState([]);
  const [log, setLog] = useState([]);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    getRaces().then(res => {
      setRaces(res.data);
      const url = res.data?.url || "";
      const id = url.split("v=")[1]?.split("&")[0] || null;
      setVideoId(id);
    });

    getSessionLog().then(res => setLog(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-dndgold mb-4">Admin Panel</h1>

      {log.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-dndgold mb-2">📜 Журнал подій</h2>
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

export default AdminPage;