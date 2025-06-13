
import { withApiHost } from '../utils/imageUtils';
import { useTranslation } from 'react-i18next';

export default function PlayerCard({ character, onSelect }) {
  const { t } = useTranslation();
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-gradient-to-br from-gray-800 to-black text-white font-dnd">
      <img src={withApiHost(character.image) || "/default-avatar.png"} alt="character" className="rounded mb-2 h-32 w-full object-cover" />
      <h3 className="text-xl text-dndgold">{character.name}</h3>
      <p className="text-sm">
        Раса: {t('races.' + (character.race || '')) || character.race}
      </p>
      <p className="text-sm">
        Клас: {t('classes.' + (character.class || '')) || character.class}
      </p>
      <button onClick={() => onSelect(character)} className="mt-2 bg-red-800 px-3 py-1 text-sm rounded text-white hover:bg-red-700">Грати</button>
    </div>
  );
}