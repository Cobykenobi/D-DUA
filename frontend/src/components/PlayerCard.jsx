import { useState } from 'react';
import { motion } from 'framer-motion';
import { withApiHost } from '../utils/imageUtils';
import { raceUA, classUA, statUA } from '../translations/ua';
import { getClassBorderColor } from '../utils/classColors';
import Modal from './Modal';

function translateEffect(effectString) {
  return effectString.replace(/\+(\d+)\s([A-Z]+)/g, (_, num, stat) => {
    return `+${num} до ${statUA[stat] || stat}`;
  });
}

export default function PlayerCard({ character, onSelect }) {
  const [open, setOpen] = useState(false);
  const borderColor = getClassBorderColor(
    character.profession?.code || character.profession?.name
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border rounded-lg shadow-lg p-4 bg-gradient-to-br from-gray-800 to-black text-white font-dnd w-56 ${borderColor}`}
      >
        <img
          src={withApiHost(character.image) || '/default-avatar.png'}
          alt="character"
          className="rounded mb-2 h-28 w-full object-cover"
          onError={e => (e.currentTarget.src = '/default-avatar.png')}
        />
        <h3 className="text-lg text-dndgold text-center mb-1">{character.name}</h3>
        <p className="text-xs text-center">
          {raceUA[character.race?.code || character.race] || character.race?.name || character.race?.code || ''}{' '}/{' '}
          {classUA[character.profession?.code || character.profession] || character.profession?.name || character.profession?.code || ''}
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 bg-dndgold text-dndred font-dnd rounded-2xl px-3 py-1"
        >
          Детальніше
        </button>
        {onSelect && (
          <button
            onClick={() => onSelect(character)}
            className="mt-2 bg-red-800 px-3 py-1 text-sm rounded text-white hover:bg-red-700"
          >
            Грати
          </button>
        )}
      </motion.div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg text-dndgold text-center mb-2">{character.name}</h3>
        {character.stats && (
          <ul className="list-none pl-0 text-lg font-bold space-y-0.5">
            {Object.entries(character.stats).map(([key, val]) => (
              <li key={key}>
                {statUA[key.toUpperCase()] || key}: {val}
              </li>
            ))}
          </ul>
        )}
        {character.inventory && character.inventory.length > 0 && (
          <ul className="list-disc pl-4 mt-2 space-y-0.5">
            {character.inventory.map((it, idx) => {
              const bonus =
                it.bonus && Object.keys(it.bonus).length
                  ?
                      ' (' +
                      Object.entries(it.bonus)
                        .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${statUA[k.toUpperCase()] || k}`)
                        .join(', ') +
                      ')'
                  : '';
              return (
                <li key={idx}>
                  {it.item}
                  {it.amount > 1 ? ` x${it.amount}` : ''}
                  {bonus}
                  {it.effect ? ` (${translateEffect(it.effect)})` : ''}
                </li>
              );
            })}
          </ul>
        )}
      </Modal>
    </>
  );
}
