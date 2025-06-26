import { useState } from 'react';
import { motion } from 'framer-motion';
import { withApiHost } from '../utils/imageUtils';
import { useTranslation } from 'react-i18next';
import { getClassBorderColor } from '../utils/classColors';
import Modal from './Modal';
import { normalizeInventory } from '../utils/inventoryUtils';

import translateOrRaw from '../utils/translateOrRaw';

import translateEffect from '../utils/effectUtils.js';


export default function PlayerCard({ character, onSelect }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const borderColor = getClassBorderColor(
    character.profession?.code || character.profession?.name
  );

  const raceCode =
    typeof character.race === 'string'
      ? character.race
      : character.race?.code || '';
  const raceKey = (raceCode || '')
    .toLowerCase()
    .replace(/_(male|female)$/, '');
  const raceName = character.race?.name || raceCode;

  const charClass =
    typeof character.profession === 'string'
      ? character.profession
      : character.profession?.code || '';
  const classKey = (charClass || '').toLowerCase();
  const className = character.profession?.name || charClass;
  const genderCode = (character.gender || '').toLowerCase();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border rounded-lg shadow-lg p-4 bg-gradient-to-br from-gray-800 to-black text-white font-dnd w-56 ${borderColor}`}
      >
        <img
          src={withApiHost(character.avatar || character.image) || '/default-avatar.png'}
          alt="character"
          className="rounded mb-2 h-28 w-full object-cover"
          onError={e => (e.currentTarget.src = '/default-avatar.png')}
        />
        <h3 className="text-lg text-dndgold text-center mb-1">{character.name}</h3>
        <p className="text-xs text-center">
          {translateOrRaw(t, 'gender.' + genderCode, genderCode)} ·{' '}
          {translateOrRaw(t, `races.${raceKey}`, raceName)}{' '}/{' '}
          {translateOrRaw(t, `classes.${classKey}`, className)}
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 bg-dndgold text-dndred font-dnd rounded-2xl px-3 py-1"
        >
          {t('more_details')}
        </button>
        {onSelect && (
          <button
            onClick={() => onSelect(character)}
            className="mt-2 bg-red-800 px-3 py-1 text-sm rounded text-white hover:bg-red-700"
          >
            {t('play_character')}
          </button>
        )}
      </motion.div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg text-dndgold text-center mb-2">{character.name}</h3>
        {character.stats && (
          <ul className="list-none pl-0 text-lg font-bold space-y-0.5">
              {Object.entries(character.stats).map(([key, val]) => (
              <li key={key}>
                {translateOrRaw(t, `stats.${key.toLowerCase()}`, key)}: {val}
              </li>
            ))}
          </ul>
        )}
        {(() => {
          const inv = normalizeInventory(character.inventory);
          if (inv.type === 'array' && inv.items.length > 0) {
            return (
              <ul className="list-disc pl-4 mt-2 space-y-0.5">
                {inv.items.map((it, idx) => {
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


                      {translateOrRaw(t, `item.${(it.code || it.item).toLowerCase()}`, it.item)}


                      {it.amount > 1 ? ` x${it.amount}` : ''}
                      {bonusData}
                      {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                    </li>
                  );
                })}
              </ul>
            );
          }
          if (inv.type === 'object' && inv.items.length > 0) {
            return (
              <ul className="list-disc pl-4 mt-2 space-y-0.5">
                {inv.items.map(([key, it]) => {
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


                      {translateOrRaw(t, `item.${(it.code || it.item).toLowerCase()}`, it.item)}


                      {it.amount > 1 ? ` x${it.amount}` : ''}
                      {bonusData}
                      {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                    </li>
                  );
                })}
              </ul>
            );
          }
          return (
            <ul className="list-disc pl-4 mt-2 space-y-0.5">
              <li>{t('inventory_ui.empty')}</li>
            </ul>
          );
        })()}
      </Modal>
    </>
  );
}
