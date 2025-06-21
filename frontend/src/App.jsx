import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <== Додано Navigate
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CharacterCreatePage from './pages/CharacterCreatePage';
import LobbyPage from './pages/LobbyPage';
import AdminPage from './pages/AdminPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import GameTablePage from './pages/GameTablePage';
import AdminLoginPage from './pages/AdminLoginPage';
import SettingsPanel from './pages/SettingsPanel';

const isAuthenticated = () => !!localStorage.getItem('token');
const isAdmin = () => {
  try {
    const data = JSON.parse(localStorage.getItem('user-storage') || '{}');
    return data.state?.user?.role === 'admin';
  } catch {
    return false;
  }
};

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to={isAuthenticated() ? "/profile" : "/login"} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
    <Route path="/create-character" element={isAuthenticated() ? <CharacterCreatePage /> : <Navigate to="/login" />} />
    <Route path="/lobby" element={isAuthenticated() ? <LobbyPage /> : <Navigate to="/login" />} />
    <Route path="/admin" element={isAdmin() ? <AdminPage /> : <Navigate to="/admin/login" />} />
    <Route path="/admin/inventory/:characterId" element={isAdmin() ? <AdminInventoryPage /> : <Navigate to="/admin/login" />} />
    <Route path="/admin/users" element={isAdmin() ? <AdminUsersPage /> : <Navigate to="/admin/login" />} />
    <Route path="/change-password" element={isAuthenticated() ? <ChangePasswordPage /> : <Navigate to="/login" />} />
    <Route path="/settings" element={<SettingsPanel />} />
    <Route path="/table/:tableId" element={<GameTablePage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default App;
