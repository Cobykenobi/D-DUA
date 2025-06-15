
import { withApiHost } from '../utils/imageUtils';
import { useTranslation } from 'react-i18next';

export default function PlayerCard({ character, onSelect }) {
  const { t } = useTranslation();
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-gradient-to-br from-gray-800 to-black text-white font-dnd w-56">
      <img
        src={withApiHost(character.image) || '/default-avatar.png'}
        alt="character"
        className="rounded mb-2 h-28 w-full object-cover"
      />
      <h3 className="text-lg text-dndgold text-center mb-1">{character.name}</h3>
      <p className="text-xs text-center">
        {character.race?.code ? t(`races.${character.race.code.toLowerCase()}`, character.race.name || character.race.code) : (character.race?.name || '')} /{' '}
        {character.profession?.code ? t(`classes.${character.profession.code.toLowerCase()}`, character.profession.name || character.profession.code) : (character.profession?.name || '')}
      </p>
      {character.stats && (
        <ul className="text-xs grid grid-cols-2 gap-x-2 mt-2">
          {Object.entries(character.stats).map(([key, val]) => (
            <li key={key}>
              {t('stats.' + key) || key}: {val}
            </li>
          ))}
        </ul>
      )}
      {character.inventory && character.inventory.length > 0 && (
        <ul className="text-xs list-disc pl-4 mt-2 space-y-0.5">
          {character.inventory.map((it, idx) => {
            const bonus = it.bonus && Object.keys(it.bonus).length
              ? ' (' +
                Object.entries(it.bonus)
                  .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${t('stats.' + k.toLowerCase(), k)}`)
                  .join(', ') +
                ')'
              : '';
            return (
              <li key={idx}>
                {it.item}
                {it.amount > 1 ? ` x${it.amount}` : ''}
                {bonus}
              </li>
            );
          })}
        </ul>
      )}
      {onSelect && (
        <button
          onClick={() => onSelect(character)}
          className="mt-2 bg-red-800 px-3 py-1 text-sm rounded text-white hover:bg-red-700"
        >
          Грати
        </button>
      )}
    </div>
  );
}