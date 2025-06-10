import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage';
import CreateCharacterPage from '../pages/CreateCharacterPage';
import CharacterEditPage from '../pages/CharacterEditPage';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="characters" element={<CharactersPage />} />
      <Route path="characters/new" element={<CreateCharacterPage />} />
      <Route path="characters/:id/edit" element={<CharacterEditPage />} />
    </Routes>
  );
}
