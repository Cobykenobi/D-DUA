import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from "../api/axios";

export default function GMDashboard() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api.get('/table')
      .then(res => setTables(res.data || []))
      .catch(() => setTables([]));
  }, []);

  const openTable = (id) => {
    navigate(`/gm-table/${id}`);
  };

  const createTable = async () => {
    try {
      const res = await api.post('/table');
      const { tableId } = res.data;
      openTable(tableId);
      setTables(t => [...t, res.data]);
    } catch {
      // fail silently
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dndbg text-dndgold font-dnd">
      <h1 className="text-3xl font-bold mb-6">{t('gm_dashboard')}</h1>
      <button
        onClick={createTable}
        className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-3 px-6 rounded-xl shadow-md transition"
      >
        {t('create_new_table')}
      </button>
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl mb-2">{t('my_tables')}</h2>
        <ul className="flex flex-col gap-2">
          {tables.map((t) => (
            <li key={t.tableId} className="flex justify-between items-center bg-[#2c1a12] p-2 rounded">
              <span>{t.tableId}</span>
              <button
                onClick={() => openTable(t.tableId)}
                className="bg-dndgold text-dndred font-dnd rounded px-3 py-1 transition active:scale-95"
              >
                {t('open')}
              </button>
            </li>
          ))}
          {tables.length === 0 && (
            <li className="text-center text-sm text-dndgold/80">{t('no_tables')}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
