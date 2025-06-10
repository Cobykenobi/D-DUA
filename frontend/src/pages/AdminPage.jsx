import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "master")) {
      navigate("/");
      return;
    }
    const fetchUsers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await axios.get(`${apiUrl}/api/admin/users`);
        setUsers(res.data);
      } catch (e) {}
    };
    fetchUsers();
  }, [user, navigate]);

  if (!user || (user.role !== "admin" && user.role !== "master")) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-10 rounded-2xl shadow-dnd w-full max-w-xl flex flex-col items-center">
        <h1
          className="text-4xl text-dndgold mb-4"
          style={{ fontFamily: "IM Fell English SC, serif" }}
        >
          Адмін-панель
        </h1>
        <table className="w-full text-dndgold mb-4" style={{ fontFamily: "IM Fell English SC, serif" }}>
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.login}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
