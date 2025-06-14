import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import InventoryEditor from '../../components/InventoryEditor';

export default function AdminInventoryPage() {
  const { characterId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/inventory/${characterId}`);
        const data = res.data?.items || [];
        setItems(data.map(it => it.name || it.item || it));
      } catch (err) {
        setItems([]);
      }
      setLoading(false);
    };
    fetchInventory();
  }, [characterId]);

  const handleSave = async () => {
    await api.put(
      `/inventory/${characterId}`,
      { items: items.map(name => ({ name })) }
    );
    alert('Збережено');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Редагування інвентарю</h1>
        {loading ? (
          <div className="text-center text-dndgold">Завантаження...</div>
        ) : (
          <InventoryEditor inventory={items} onChange={setItems} />
        )}
        <button
          onClick={handleSave}
          className="mt-4 bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2"
        >
          Зберегти
        </button>
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">
          ← Назад
        </Link>
      </div>
    </div>
  );
}
