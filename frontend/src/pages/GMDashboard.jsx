import { useNavigate } from 'react-router-dom';
import api from "../api/axios";

export default function GMDashboard() {
  const navigate = useNavigate();

  const createTable = async () => {
    try {
      const res = await api.post('/table');
      const { tableId } = res.data;
      navigate(`/gm-table/${tableId}`);
      window.open(`/gm-control/${tableId}`, '_blank');
    } catch {
      // fail silently
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dndbg text-dndgold font-dnd">
      <h1 className="text-3xl font-bold mb-6">Панель Майстра</h1>
      <button
        onClick={createTable}
        className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-3 px-6 rounded-xl shadow-md transition"
      >
        Створити новий стіл
      </button>
    </div>
  );
}
