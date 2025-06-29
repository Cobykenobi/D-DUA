import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/user';
import { useState, useEffect } from 'react';
import api from "../api/axios";
import { useAppearance } from '../context/AppearanceContext';

function AdminLoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    let attempts = 0;
    const ping = () => {
      api.get('/ping').then(() => setServerReady(true)).catch(() => {
        if (attempts < 2) {
          attempts++;
          setTimeout(ping, 1000);
        } else {
          showToast('Failed to connect to server', 'error');
        }
      });
    };
    ping();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!login || !password) {
      showToast(t('fields_required'), 'error');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/admin/auth', { login, password });
      setUser(res.data.user, res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const { background } = useAppearance();
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div className="bg-[#2d1d14]/90 p-8 rounded-lg shadow-lg w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-dnd mb-4">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="text-red-400">{error}</div>}

          {!serverReady && (
            <div className="text-yellow-300">Connecting to server...</div>
          )}
          <input
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={!serverReady || loading}
            className="bg-red-700 hover:bg-red-800 rounded py-2 text-white font-bold transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Вхід...' : t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
