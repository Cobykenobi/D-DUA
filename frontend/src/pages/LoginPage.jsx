// LoginPage.jsx (patched)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    const res = await axios.post('/api/login', {
      username: username.value,
      password: password.value,
    });

    const user = res.data;
    if (user.role === 'gm') {
      navigate('/gm-dashboard');
    } else {
      navigate('/characters');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name='username' placeholder='Username' />
      <input name='password' placeholder='Password' type='password' />
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginPage;
