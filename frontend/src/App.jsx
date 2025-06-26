import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const CharacterCreatePage = React.lazy(() => import('./pages/CharacterCreatePage'));
const LobbyPage = React.lazy(() => import('./pages/LobbyPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const AdminInventoryPage = React.lazy(() => import('./pages/admin/AdminInventoryPage'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/AdminUsersPage'));
const ChangePasswordPage = React.lazy(() => import('./pages/ChangePasswordPage'));
const GameTablePage = React.lazy(() => import('./pages/GameTablePage'));
const GMTablePage = React.lazy(() => import('./pages/gm/GMTablePage'));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const SettingsPanel = React.lazy(() => import('./pages/SettingsPanel'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const GMDashboard = React.lazy(() => import('./pages/GMDashboard'));
const GMControlPage = React.lazy(() => import('./pages/gm/GMControlPage'));

import PrivateRoute from './PrivateRoute';
import useKeepAlive from './hooks/useKeepAlive';

const isAuthenticated = () => !!localStorage.getItem('token');
const isAdmin = () => {
  try {
    const data = JSON.parse(localStorage.getItem('user-storage') || '{}');
    return data.state?.user?.role === 'admin';
  } catch {
    return false;
  }
};

const isGM = () => {
  try {
    const data = JSON.parse(localStorage.getItem('user-storage') || '{}');
    return data.state?.user?.role === 'gm';
  } catch {
    return false;
  }
};

const homeRoute = () => {
  if (!isAuthenticated()) return '/login';
  return isGM() ? '/gm-dashboard' : '/characters';
};

const App = () => {
  useKeepAlive();
  return (
    <React.Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Navigate to={homeRoute()} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/ping" element={<div>ok</div>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/characters" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route
        path="/create-character"
        element={isAuthenticated() ? (isGM() ? <Navigate to="/gm-dashboard" /> : <CharacterCreatePage />) : <Navigate to="/login" />}
      />
      <Route path="/lobby" element={isAuthenticated() ? <LobbyPage /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isAdmin() ? <AdminPage /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/inventory/:characterId" element={isAdmin() ? <AdminInventoryPage /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/users" element={isAdmin() ? <AdminUsersPage /> : <Navigate to="/admin/login" />} />
      <Route path="/change-password" element={isAuthenticated() ? <ChangePasswordPage /> : <Navigate to="/login" />} />

      <Route path="/settings" element={<SettingsPanel />} />


    <Route path="/table/:tableId" element={<GameTablePage />} />

    <Route path="/gm-dashboard" element={<PrivateRoute roles={['gm']}><GMDashboard /></PrivateRoute>} />
    <Route path="/gm-table/:tableId" element={<PrivateRoute roles={['gm']}><GameTablePage /></PrivateRoute>} />
    <Route path="/gm-control/:tableId" element={<PrivateRoute roles={['gm']}><GMControlPage /></PrivateRoute>} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
    </React.Suspense>
  );
};

export default App;
