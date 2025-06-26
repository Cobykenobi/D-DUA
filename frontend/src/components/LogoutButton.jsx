import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const navigate = useNavigate();
  const logout = useUserStore((s) => s.logout);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
    >
      {t('logout')}
    </button>
  );
}

export default LogoutButton;
