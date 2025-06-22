import {
  AdminRacesPage,
  AdminProfessionsPage,
  AdminCharacteristicsPage,
  AdminMapsPage,
  AdminMusicPage,
  AdminInventoryPage,
} from '../pages/admin';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="races" element={<AdminRacesPage />} />
      <Route path="professions" element={<AdminProfessionsPage />} />
      <Route path="characteristics" element={<AdminCharacteristicsPage />} />
      <Route path="maps" element={<AdminMapsPage />} />
      <Route path="music" element={<AdminMusicPage />} />
      <Route path="inventory/:characterId" element={<AdminInventoryPage />} />
    </Routes>
  );
}
