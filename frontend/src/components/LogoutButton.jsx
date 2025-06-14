import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

function LogoutButton() {
  const navigate = useNavigate();
  const logout = useUserStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
    >
      Вийти
    </button>
  );
}

export default LogoutButton;
