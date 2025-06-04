import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AdminRacesPage,
  AdminProfessionsPage,
  AdminCharacteristicsPage,
  AdminMapsPage,
  AdminMusicPage,
} from '../pages/admin';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="races" element={<AdminRacesPage />} />
      <Route path="professions" element={<AdminProfessionsPage />} />
      <Route path="characteristics" element={<AdminCharacteristicsPage />} />
      <Route path="maps" element={<AdminMapsPage />} />
      <Route path="music" element={<AdminMusicPage />} />
    </Routes>
  );
}
