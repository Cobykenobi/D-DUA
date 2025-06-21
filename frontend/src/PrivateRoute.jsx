import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  if (roles && roles.length) {
    try {
      const data = JSON.parse(localStorage.getItem('user-storage') || '{}');
      const userRole = data.state?.user?.role;
      if (!roles.includes(userRole)) {
        return <Navigate to="/" />;
      }
    } catch {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default PrivateRoute;
