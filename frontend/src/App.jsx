import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import GameTablePage from './pages/GameTablePage';
import { useUserStore } from './store/user';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import './App.css';
import CreateCharacterPage from './pages/CreateCharacterPage';
import CharactersPage from './pages/CharactersPage';

export default function App() {
  const { user, restore } = useUserStore();

  useEffect(() => {
    restore();
  }, []);
console.log("USER IN STORE:", user);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={user ? <MainPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/table" element={user ? <GameTablePage /> : <Navigate to="/login" />} />
      <Route path="/admin" element={user?.role === 'master' || user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/create-character" element={<CreateCharacterPage />} />
      <Route path="/characters" element={<CharactersPage />} />
    </Routes>
  );
}
