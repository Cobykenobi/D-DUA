import { useNavigate } from 'react-router-dom';

export default function GMDashboard() {
  const navigate = useNavigate();

  const createTable = () => {
    const tableId = Math.random().toString(36).substring(2, 8);
    navigate(`/gm-table/${tableId}`);
    window.open(`/gm-control/${tableId}`, '_blank');
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
