import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Паролі не співпадають');
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.post(
        `${apiUrl}/api/auth/register`,
        { username, password }
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-row items-center mb-6 mt-12">
        <h1
          className="text-4xl md:text-5xl drop-shadow-lg animate-pulse text-center"
          style={{
            color: '#23160c',
            fontFamily: 'IM Fell English SC, serif',
            textShadow: '2px 2px 6px #f9e7b4, 0 2px 16px #f9e7b4'
          }}
        >
          Реєстрація D&D 5051
        </h1>
      </div>
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-xs w-full">
        <h2 className="text-3xl text-dndgold text-center mb-4" style={{ fontFamily: 'IM Fell English SC, serif' }}>Створи аккаунт</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
          />
          <input
            type="password"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
          />
          <input
            type="password"
            required
            className="w-full rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold focus:outline-none"
            placeholder="Повторити пароль"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            name="password2"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-dndred hover:bg-dndgold text-white hover:text-dndred rounded-2xl py-2 transition-all"
            style={{ fontFamily: 'IM Fell English SC, serif' }}
          >
            Зареєструватись
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-dndgold underline" style={{ fontFamily: 'IM Fell English SC, serif' }}>Вже є аккаунт?</Link>
        </div>
      </div>
    </div>
  );
}
