
import { useUserStore } from '../store/user'
import { useTranslation } from 'react-i18next'

export default function CharactersPage() {
  const { user } = useUserStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-6 text-dndgold font-dnd">
      <h1 className="text-3xl mb-4">{t('player_characters', { login: user?.login })}</h1>
      <div className="border border-dndgold p-4 rounded">
        {/* Тут буде список персонажів */}
        <p>{t('character_list_empty')}</p>
        <button className="mt-4 px-4 py-2 bg-dndred text-white rounded hover:bg-dndgold hover:text-dndred transition active:scale-95">
          {t('create_new')}
        </button>
      </div>
    </div>
  );
}
