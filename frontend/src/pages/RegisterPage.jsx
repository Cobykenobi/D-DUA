import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../store/user';

export default function RegisterPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // !!! ЗАПИТ на правильний бекенд !!!
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(
        `${apiUrl}/api/auth/register`,
        { login, password }
      );
      setUser(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dndbg">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-xs w-full">
        <h1 className="font-dnd text-3xl text-dndgold text-center mb-4">Реєстрація</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
            Зареєструватися
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-dndgold underline">Вже є аккаунт?</Link>
        </div>
      </div>
    </div>
  );
}
