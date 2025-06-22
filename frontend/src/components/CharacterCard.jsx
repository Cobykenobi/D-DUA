import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeInventory } from '../utils/inventoryUtils';
import { withApiHost } from '../utils/imageUtils';
import Modal from './Modal';
import translateOrRaw from '../utils/translateOrRaw.js';
import translateEffect from '../utils/effectUtils.js';

export default function CharacterCard({
  character,
  editLabel,
  onEdit,
  onDelete,
  onSaveDescription,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState(character.description || '');
  const raceKey =
    typeof character.race === 'string'
      ? character.race
      : character.race?.name || character.race?.code || '';
  const classKey =
    typeof character.class === 'string'
      ? character.class
      : character.class?.name || character.class?.code || '';
  const raceKeyLower = (raceKey || '').toLowerCase();
  const classKeyLower = (classKey || '').toLowerCase();

  return (
    <>
      <div className="card max-w-[400px] flex flex-col items-center">
        <img
          src={withApiHost(character.image) || '/default-avatar.png'}
          alt={character.name}
          onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h3 className="text-lg text-center text-dndgold mb-1">{character.name}</h3>
        <p className="text-sm text-center mb-2">
          {translateOrRaw(t, `races.${raceKeyLower}`, raceKey)} /{' '}
          {translateOrRaw(t, `classes.${classKeyLower}`, classKey)}
        </p>
        {character.description && (
          <p className="text-sm italic mb-2 text-center">{character.description}</p>
        )}
        <div className="mt-auto flex flex-wrap justify-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-1 transition active:scale-95"
            >
              {editLabel || 'Редагувати'}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-800 hover:bg-red-700 text-white rounded-2xl px-4 py-1 transition active:scale-95"
            >
              Видалити
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            className="bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-1 transition active:scale-95"
          >
            Деталі
          </button>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg text-dndgold text-center mb-2">{character.name}</h3>
        <p className="text-sm text-center mb-2">
          {translateOrRaw(t, `races.${raceKeyLower}`, raceKey)} /{' '}
          {translateOrRaw(t, `classes.${classKeyLower}`, classKey)}
        </p>
        <textarea
          className="w-full rounded-lg p-2 bg-[#2c1a12] border border-dndgold text-dndgold mb-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {onSaveDescription && (
          <button
            onClick={() => {
              onSaveDescription(character._id, desc);
              setOpen(false);
            }}
            className="mb-2 bg-dndgold text-dndred font-dnd rounded-2xl px-4 py-1 transition active:scale-95"
          >
            Зберегти
          </button>
        )}
        {character.stats && (
          <ul className="list-none pl-0 text-sm mb-2 space-y-0.5">
            {Object.entries(character.stats).map(([key, value]) => (
              <li key={key}>
                {translateOrRaw(t, `stats.${key.toLowerCase()}`, key)}: {value}
              </li>
            ))}
          </ul>
        )}
        <h4 className="text-dndgold mb-1">{t('inventory.title')}</h4>
        <ul className="list-disc pl-4 text-sm space-y-0.5">
          {(() => {
            const inv = normalizeInventory(character.inventory);
            if (inv.type === 'array' && inv.items.length > 0) {
              return inv.items.map((it, idx) => {
                const bonusData =
                  it.bonus &&
                  typeof it.bonus === 'object' &&
                  Object.keys(it.bonus).length
                    ?
                        ' (' +
                        Object.entries(it.bonus)
                          .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase(), k)}`)
                          .join(', ') +
                        ')'
                    : '';
                return (
                  <li key={idx}>
                    {translateOrRaw(t, `inventory.${it.item.toLowerCase()}`, it.item)}
                    {it.amount > 1 ? ` x${it.amount}` : ''}
                    {bonusData}
                    {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                  </li>
                );
              });
            }
            if (inv.type === 'object' && inv.items.length > 0) {
              return inv.items.map(([key, it]) => {
                const bonusData =
                  it.bonus &&
                  typeof it.bonus === 'object' &&
                  Object.keys(it.bonus).length
                    ?
                        ' (' +
                        Object.entries(it.bonus)
                          .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase(), k)}`)
                          .join(', ') +
                        ')'
                    : '';
                return (
                  <li key={key}>
                    {translateOrRaw(t, `inventory.${it.item.toLowerCase()}`, it.item)}
                    {it.amount > 1 ? ` x${it.amount}` : ''}
                    {bonusData}
                    {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                  </li>
                );
              });
            }
            return <li>{t('inventory.empty')}</li>;
          })()}
        </ul>
      </Modal>
    </>
  );
}
