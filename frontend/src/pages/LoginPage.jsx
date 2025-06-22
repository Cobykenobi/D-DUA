import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';
import { useUserStore } from '../store/user';

function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUser = useUserStore((s) => s.setUser);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { login: loginInput, password } = event.target.elements;

    const res = await api.post('/auth/login', {
      login: loginInput.value,
      password: password.value,
    });

    const { user, token } = res.data;
    setUser(user, token);
    navigate(user.role === 'gm' ? '/gm-dashboard' : '/characters');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/map-bg.jpg')` }}
    >
      <div className="bg-[#2d1d14]/90 p-8 rounded-lg shadow-lg w-full max-w-md text-center text-white">
        <h2 className="text-3xl font-dnd mb-4">{t('login')}</h2>
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
          <input
            name="login"
            placeholder={t('login')}
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300 w-full min-w-[300px]"
            required
          />
          <input
            name="password"
            type="password"
            placeholder={t('password')}
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300 w-full min-w-[300px]"
            required
          />
          <div className="flex gap-2 w-full pt-2">
            <button
              type="submit"
              className="flex-1 bg-red-700 hover:bg-red-800 rounded py-2 text-white font-bold transition active:scale-95"
            >
              {t('login')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 rounded py-2 text-white font-bold transition active:scale-95"
            >
              {t('admin')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="flex-1 bg-green-700 hover:bg-green-800 rounded py-2 text-white font-bold transition active:scale-95"
            >
              {t('register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
