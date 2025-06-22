import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';

const CharacterListPage = React.lazy(() => import('../pages/CharacterListPage'));
const CharacterCreatePage = React.lazy(() => import('../pages/CharacterCreatePage'));
const CharacterEditPage = React.lazy(() => import('../pages/CharacterEditPage'));

export default function UserRoutes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="characters" element={<CharacterListPage />} />
        <Route path="characters/new" element={<CharacterCreatePage />} />
        <Route path="characters/:id/edit" element={<CharacterEditPage />} />
      </Routes>
    </React.Suspense>
  );
}
