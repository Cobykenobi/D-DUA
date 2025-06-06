import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post("/api/auth/login", { login, password });
      // Зберігаємо токен і користувача
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token); // ДОДАНО збереження токена
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Помилка входу");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: "url('/nd-bg.png')" }}>
      <form className="bg-[#2e1b10]/90 rounded-2xl p-8 shadow-dnd flex flex-col items-center w-full max-w-md"
        onSubmit={handleLogin}>
        <h2 className="text-3xl text-dndgold mb-4 font-dnd">Вхід у гру</h2>
        <input
          type="text"
          required
          className="w-full rounded-2xl px-3 py-2 mb-2 border border-dndgold bg-transparent text-dndgold"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          name="login"
          style={{ fontFamily: 'IM Fell English SC, serif' }}
        />
        <input
          type="password"
          required
          className="w-full rounded-2xl px-3 py-2 mb-2 border border-dndgold bg-transparent text-dndgold"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          style={{ fontFamily: 'IM Fell English SC, serif' }}
        />
        {error && <div className="text-red-400 text-center text-sm mb-2">{error}</div>}
        <button className="bg-dndred text-white px-8 py-2 rounded-2xl hover:bg-dndgold hover:text-dndred mt-2 mb-2 font-dnd">
          Увійти
        </button>
        <Link to="/register" className="text-dndgold underline text-sm mt-2">Створити аккаунт</Link>
      </form>
    </div>
  );
}
