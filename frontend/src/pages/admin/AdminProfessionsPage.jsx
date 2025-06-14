import api from '../../api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
export default function AdminProfessionsPage() {
  const [professions, setProfessions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchProfessions = async () => {
    setLoading(true);
    const res = await api.get('/profession');
    setProfessions(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchProfessions(); }, []);

  const addProfession = async (e) => {
    e.preventDefault();
    await api.post('/profession', { name, description });
    setName(''); setDescription(''); fetchProfessions();
  };

  const removeProfession = async (id) => {
    await api.delete(`/profession/${id}`);
    fetchProfessions();
  };

  const saveProfession = async (id, data) => {
    await api.put(`/profession/${id}`, data);
    fetchProfessions();
  };

  const startEdit = (prof) => {
    setEditingId(prof._id);
    setEditName(prof.name);
    setEditDescription(prof.description || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  const saveEdit = async (id) => {
    await saveProfession(id, { name: editName, description: editDescription });
    cancelEdit();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Професії</h1>
        <form className="flex gap-2 mb-6" onSubmit={addProfession}>
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Назва професії"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
            placeholder="Опис (необов'язково)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-2 transition active:scale-95">Додати</button>
        </form>
        {loading ? (
          <div className="text-center text-dndgold">Завантаження...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-dndgold divide-y divide-dndgold/20">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Назва</th>
                  <th className="py-2">Опис</th>
                  <th className="py-2 w-24">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dndgold/20">
                {professions.map(p => (
                  <tr key={p._id} className="align-top">
                    <td className="py-1 pr-2">
                      {editingId === p._id ? (
                        <input
                          className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                      ) : (
                        <span>{p.name}</span>
                      )}
                    </td>
                    <td className="py-1 pr-2">
                      {editingId === p._id ? (
                        <input
                          className="w-full rounded-lg px-2 py-1 bg-[#2c1a12] border border-dndgold text-dndgold"
                          value={editDescription}
                          onChange={e => setEditDescription(e.target.value)}
                        />
                      ) : (
                        <span>{p.description}</span>
                      )}
                    </td>
                    <td className="py-1 flex gap-2">
                      {editingId === p._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(p._id)}
                            className="bg-dndgold text-dndred font-dnd rounded-2xl px-2 py-1 transition active:scale-95"
                          >
                            Зберегти
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-dndred hover:underline"
                          >
                            Скасувати
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(p)}
                            className="bg-dndgold text-dndred font-dnd rounded-2xl px-2 py-1 transition active:scale-95"
                          >
                            Редагувати
                          </button>
                          <button
                            onClick={() => removeProfession(p._id)}
                            className="text-dndred hover:underline"
                          >
                            Видалити
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/admin" className="block text-dndgold underline mt-6 text-center">← Назад</Link>
      </div>
    </div>
  );
}
