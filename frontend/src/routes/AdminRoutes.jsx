import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';

const AdminRacesPage = React.lazy(() => import('../pages/admin/AdminRacesPage'));
const AdminProfessionsPage = React.lazy(() => import('../pages/admin/AdminProfessionsPage'));
const AdminCharacteristicsPage = React.lazy(() => import('../pages/admin/AdminCharacteristicsPage'));
const AdminMapsPage = React.lazy(() => import('../pages/admin/AdminMapsPage'));
const AdminMusicPage = React.lazy(() => import('../pages/admin/AdminMusicPage'));
const AdminInventoryPage = React.lazy(() => import('../pages/admin/AdminInventoryPage'));
const AdminAppearancePage = React.lazy(() => import('../pages/admin/AdminAppearancePage'));

export default function AdminRoutes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="races" element={<AdminRacesPage />} />
        <Route path="professions" element={<AdminProfessionsPage />} />
        <Route path="characteristics" element={<AdminCharacteristicsPage />} />
        <Route path="maps" element={<AdminMapsPage />} />
        <Route path="music" element={<AdminMusicPage />} />
        <Route path="inventory/:characterId" element={<AdminInventoryPage />} />
        <Route path="appearance" element={<AdminAppearancePage />} />
      </Routes>
    </React.Suspense>
  );
}
