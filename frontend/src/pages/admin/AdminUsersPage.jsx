import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, updateUserRole } from '../../api/adminActions';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleRole = async (id, role) => {
    const newRole = role === 'gm' ? 'player' : 'gm';
    try {
      await updateUserRole(id, newRole);
      setUsers(u => u.map(user => user._id === id ? { ...user, role: newRole } : user));
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg p-4">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd w-full max-w-xl">
        <h1 className="font-dnd text-2xl text-dndgold mb-4">Адмін: Користувачі</h1>
        {loading ? (
          <div className="text-center text-dndgold">Завантаження...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-dndgold divide-y divide-dndgold/20">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Логін</th>
                  <th className="py-2">Ім'я</th>
                  <th className="py-2">Роль</th>
                  <th className="py-2 w-24">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dndgold/20">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="py-1 pr-2">{user.login}</td>
                    <td className="py-1 pr-2">{user.username}</td>
                    <td className="py-1 pr-2">{user.role}</td>
                    <td className="py-1">
                      <button
                        onClick={() => toggleRole(user._id, user.role)}
                        className="bg-dndgold text-dndred font-dnd rounded-2xl px-2 py-1 transition active:scale-95"
                      >
                        Змінити
                      </button>
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
