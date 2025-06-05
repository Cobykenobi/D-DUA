import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!login || !password || !password2) {
      setError("Всі поля обов'язкові");
      return;
    }
    if (password !== password2) {
      setError("Паролі не співпадають");
      return;
    }
    try {
      await axios.post(
        "/api/auth/register",
        { login, password }
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Помилка реєстрації");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: "url('/nd-bg.png')" }}>
      <form className="bg-[#2e1b10]/90 rounded-2xl p-8 shadow-dnd flex flex-col items-center w-full max-w-md"
        onSubmit={handleRegister}>
        <h2 className="text-3xl text-dndgold mb-4 font-dnd">Створи аккаунт</h2>
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
        <input
          type="password"
          required
          className="w-full rounded-2xl px-3 py-2 mb-2 border border-dndgold bg-transparent text-dndgold"
          placeholder="Повторіть пароль"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          name="password2"
          style={{ fontFamily: 'IM Fell English SC, serif' }}
        />
        {error && <div className="text-red-400 text-center text-sm mb-2">{error}</div>}
        <button className="bg-dndred text-white px-8 py-2 rounded-2xl hover:bg-dndgold hover:text-dndred mt-2 mb-2 font-dnd">
          Зареєструватись
        </button>
        <Link to="/login" className="text-dndgold underline text-sm mt-2">Вже є аккаунт?</Link>
      </form>
    </div>
  );
}
