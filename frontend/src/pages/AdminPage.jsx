
import React, { useEffect, useState } from "react";
import { getRaces, getSessionLog } from "../api/adminActions";

function AdminPage() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    getRaces().then(() => {
      getSessionLog().then((res) => setLog(res.data));
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Адмін Панель</h1>

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

}