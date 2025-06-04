import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../store/user';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-xs w-full">
        <h1 className="font-dnd text-3xl text-dndgold text-center mb-4">Вхід</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl py-2 transition-all"
          >
            Увійти
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-dndgold underline">Немає аккаунта?</Link>
        </div>
      </div>
    </div>
  );
}
