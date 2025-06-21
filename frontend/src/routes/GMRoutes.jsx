import { Routes, Route } from 'react-router-dom';
import GMDashboardPage from '../pages/gm/GMDashboardPage';
import GMTablePage from '../pages/gm/GMTablePage';
import GMControlPage from '../pages/gm/GMControlPage';

export default function GMRoutes() {
  return (
    <Routes>
      <Route path="/gm-dashboard" element={<GMDashboardPage />} />
      <Route path="/gm-table/:id" element={<GMTablePage />} />
      <Route path="/gm-control/:id" element={<GMControlPage />} />
    </Routes>
  );
}
