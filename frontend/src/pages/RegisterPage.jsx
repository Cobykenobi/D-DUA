import api from "../api/axios";
import { useState } from 'react';
import { useAppearance } from '../context/AppearanceContext';

import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { useTranslation } from 'react-i18next'
function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        login,
        password,
        username: login,
        role: 'player',
      });

      const response = await api.post("/auth/login", {
        login,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      if (err.response?.data?.message === 'User already exists') {
        alert(t('user_already_exists'));
      } else {
        setError(err.response?.data?.message || t('register_error'));
      }
    }
  };

  const { background } = useAppearance();
  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div className="bg-[#2d1d14]/90 p-8 rounded-lg shadow-lg w-full max-w-md text-center text-white">
        <h2 className="text-3xl font-dnd mb-4">{t('register')}</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {error && <p className="text-red-400">{error}</p>}
          <input
            type="text"
            placeholder={t('login')}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            required
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            required
          />
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 rounded py-2 text-white font-bold"
          >
            {t('register_submit')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="bg-gray-600 hover:bg-gray-700 rounded py-2 text-white font-bold"
          >
            {t('back')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
