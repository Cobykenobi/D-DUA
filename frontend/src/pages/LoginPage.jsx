import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useUserStore } from '../store/user';

function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUser = useUserStore((s) => s.setUser);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    const res = await axios.post('/api/login', {
      username: username.value,
      password: password.value,
    });

    const { user, token } = res.data;
    setUser(user, token);
    navigate(user.role === 'gm' ? '/gm-dashboard' : '/characters');
  };

  return (
    <form onSubmit={handleLogin}>
      <input name='username' placeholder={t('login')} />
      <input name='password' placeholder={t('password')} type='password' />
      <button type='submit'>{t('login')}</button>
    </form>
  );
}

export default LoginPage;
