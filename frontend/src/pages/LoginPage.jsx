import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../store/user';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        { login, password }
      );
      setUser(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center mt-12 mb-6">
        <h1
          className="font-dnd text-4xl md:text-5xl text-dndgold drop-shadow-lg animate-pulse text-center mr-4"
          style={{ fontFamily: "'IM Fell English SC', serif", fontSize: '2.7rem' }}
        >
          Ласкаво просимо до D&D
        </h1>
        <span
          className="font-dnd text-4xl md:text-5xl text-dndgold drop-shadow-lg animate-pulse text-center"
          style={{ fontFamily: "'IM Fell English SC', serif", fontSize: '2.7rem' }}
        >
          5051
        </span>
      </div>
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-xs w-full">
        <h2 className="font-dnd text-3xl text-dndgold text-center mb-4" style={{ fontFamily: "'IM Fell English SC', serif" }}>Вхід</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ fontFamily: "'IM Fell English SC', serif" }}
          />
          <input
            type="password"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontFamily: "'IM Fell English SC', serif" }}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl py-2 transition-all"
            style={{ fontFamily: "'IM Fell English SC', serif" }}
          >
            Увійти
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-dndgold underline" style={{ fontFamily: "'IM Fell English SC', serif" }}>Немає аккаунта?</Link>
        </div>
      </div>
    </div>
  );
}
