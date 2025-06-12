import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Пароль успішно змінено.");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Помилка зміни пароля");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded mt-6">
        <h2 className="text-2xl font-bold mb-4">Зміна пароля</h2>
        {message && <p className="mb-3 text-blue-600">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Поточний пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Змінити пароль
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePasswordPage;
