import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from './ThemeToggle';

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
    <nav className="bg-dndbg text-dndgold flex items-center px-4 py-2 shadow-md dark:bg-gray-900 dark:text-white">
      <Link to="/" className="flex items-center mr-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className="font-dnd text-2xl">D-DUA</span>
      </Link>
      <div className="flex items-center gap-4 flex-1">
        <Link to="/characters" className="hover:text-white">Profile</Link>
        <Link to="/settings" className="hover:text-white">Settings</Link>
        {token && (
          <button onClick={handleLogout} className="text-dndred hover:text-dndgold">
            Logout
          </button>
        )}
        <Link to="/settings" className="text-sm hover:underline">
          ⚙️
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <LanguageSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
