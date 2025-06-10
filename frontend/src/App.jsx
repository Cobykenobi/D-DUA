import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CharacterCreatePage from './pages/CharacterCreatePage';
import LobbyPage from './pages/LobbyPage';
import AdminPage from './pages/AdminPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

const isAuthenticated = () => !!localStorage.getItem('token');

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to={isAuthenticated() ? "/profile" : "/login"} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
    <Route path="/create-character" element={isAuthenticated() ? <CharacterCreatePage /> : <Navigate to="/login" />} />
    <Route path="/lobby" element={isAuthenticated() ? <LobbyPage /> : <Navigate to="/login" />} />
    <Route path="/admin" element={isAuthenticated() ? <AdminPage /> : <Navigate to="/login" />} />
    <Route path="/change-password" element={isAuthenticated() ? <ChangePasswordPage /> : <Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default App;
