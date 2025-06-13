
import { withApiHost } from '../utils/imageUtils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CharacterCard({
  character,
  onEdit,
  onDelete,
  onSaveDescription,
  editLabel = 'Редагувати',
  deleteLabel = 'Видалити',
}) {
  const { t } = useTranslation();
  const [desc, setDesc] = useState(character.description || '');
  return (
    <div className="bg-[#1c120a]/80 text-white border border-dndgold rounded-xl shadow-lg p-4 space-y-2">
      <img
        src={withApiHost(character.image) || "/default-avatar.png"}
        alt={character.name}
        className="w-20 h-20 object-cover rounded mx-auto mb-2"
      />
      <h3 className="text-xl text-dndgold text-center font-dnd mb-2">{character.name}</h3>
      <div className="text-base">
        <strong className="text-dndgold">Раса:</strong>{' '}
        {t('races.' + (character.race?.name || '')) || character.race?.name || '—'}
      </div>
      <div className="text-base">
        <strong className="text-dndgold">Клас:</strong>{' '}
        {t('classes.' + (character.profession?.name || '')) || character.profession?.name || '—'}
      </div>

      <div className="text-sm">
        <strong className="text-dndgold">Опис:</strong>{' '}
        {character.description ? (
          <span>{character.description}</span>
        ) : (
          <textarea
            className="w-full mt-1 px-2 py-1 rounded bg-[#2c1a12] border border-dndgold text-white"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        )}
      </div>
      {!character.description && (
        <button
          onClick={() => onSaveDescription && onSaveDescription(character._id || character.id, desc)}
          className="bg-dndgold text-dndred font-dnd rounded-2xl px-3 py-1 mt-1"
        >
          Зберегти опис
        </button>
      )}
      <div className="mt-2">
        <div className="text-dndgold font-semibold mb-1">Стати:</div>
        {character.stats && (
          <ul className="list-none pl-0 text-lg font-bold space-y-0.5">
            {Object.entries(character.stats).map(([key, val]) => (
              <li key={key}>
                {t('stats.' + key) || key}: {val}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-2">
        <div className="text-dndgold font-semibold mb-1">Інвентар:</div>
        <ul className="list-none pl-0 text-base space-y-0.5">
          {character.inventory && character.inventory.map((it, idx) => (
            <li key={idx}>{it.item} {it.amount > 1 ? `x${it.amount}` : ''}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3 flex gap-2 justify-center">
        {onEdit && (
          <button
            onClick={() => onEdit(character)}
            disabled={!character.description}
            className={`bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-3 py-1 transition ${!character.description ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {editLabel}
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(character._id || character.id)}
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-3 py-1 transition"
          >
            {deleteLabel}
          </button>
        )}
      </div>
    </div>
  );
}
