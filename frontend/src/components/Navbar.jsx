import React
import LanguageSwitch from './LanguageSwitch'; from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        D-DUA
      </Link>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm">👤 {user.login}</span>}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Вийти
          </button>
        )}
      </div>
    <div className='ml-auto'><LanguageSwitch /></div>
</nav>
  );
}

export default Navbar;
