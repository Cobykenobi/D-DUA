import React from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeInventory } from '../utils/inventoryUtils';
import translateOrRaw from '../utils/translateOrRaw.js';

function translateEffect(effectString, t) {
  return effectString.replace(/\+(\d+)\s([A-Z]+)/g, (_, num, stat) => {
    const key = stat.toLowerCase();
    return `+${num} ${translateOrRaw(t, 'stats.' + key)}`;
  });
}

export default function CharacterCard({ character }) {
  const { t } = useTranslation();
  const race =
    typeof character.race === 'string'
      ? character.race
      : character.race?.code || character.race?.en || '';
  const raceKey = race.toLowerCase();
  const charClass =
    typeof character.profession === 'string'
      ? character.profession
      : character.profession?.code || character.profession?.en || '';
  const classKey = charClass.toLowerCase();

  return (
    <div className='character-card'>
      <h3>{character.name}</h3>
      <p>
        {translateOrRaw(t, `races.${raceKey}`)}
      </p>
      <p>
        {translateOrRaw(t, `classes.${classKey}`)}
      </p>
      <ul>
        {Object.entries(character.stats || {}).map(([key, value]) => (
          <li key={key}>
            {translateOrRaw(t, `stats.${key.toLowerCase()}`)}: {value}
          </li>
        ))}
      </ul>
      <h4>Інвентар:</h4>
      <ul>
        {(() => {
          const inv = normalizeInventory(character.inventory);
          if (inv.type === 'array' && inv.items.length > 0) {
            return inv.items.map((it, idx) => {
              const bonus =
                it.bonus && Object.keys(it.bonus).length
                  ?
                      ' (' +
                      Object.entries(it.bonus)
                        .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase())}`)
                        .join(', ') +
                      ')'
                  : '';
              return (
                <li key={idx}>
                  {translateOrRaw(t, `inventory.${it.item.toLowerCase()}`, it.item)}
                  {it.amount > 1 ? ` x${it.amount}` : ''}
                  {bonus}
                  {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                </li>
              );
            });
          }
          if (inv.type === 'object' && inv.items.length > 0) {
            return inv.items.map(([key, it]) => {
              const bonus =
                it.bonus && Object.keys(it.bonus).length
                  ?
                      ' (' +
                      Object.entries(it.bonus)
                        .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase())}`)
                        .join(', ') +
                      ')'
                  : '';
              return (
                <li key={key}>
                  {translateOrRaw(t, `inventory.${it.item.toLowerCase()}`, it.item)}
                  {it.amount > 1 ? ` x${it.amount}` : ''}
                  {bonus}
                  {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                </li>
              );
            });
          }
          return <li>Інвентар порожній</li>;
        })()}
      </ul>
    </div>
  );
}
