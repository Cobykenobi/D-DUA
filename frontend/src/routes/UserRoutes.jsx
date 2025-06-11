import CharacterListPage from '../pages/CharacterListPage';
import CharacterCreatePage from '../pages/CharacterCreatePage';
import CharacterEditPage from '../pages/CharacterEditPage';

export default function UserRoutes() {;
  return (
    <Routes>
      <Route path="characters" element={<CharacterListPage />} />
      <Route path="characters/new" element={<CharacterCreatePage />} />
      <Route path="characters/:id/edit" element={<CharacterEditPage />} />
    </Routes>
  );
}
