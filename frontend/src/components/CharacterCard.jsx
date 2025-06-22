import React from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeInventory } from '../utils/inventoryUtils';

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

        {t(`races.${raceKey}`, t('unknown'))}

      </p>
      <p>
        {t(
          `classes.${classKey}`,
          t('unknown')
        )}
      </p>
      <ul>
        {Object.entries(character.stats || {}).map(([key, value]) => (
          <li key={key}>
            {t(`stats.${key.toLowerCase()}`, t('unknown'))}: {value}
          </li>
        ))}
      </ul>
      <h4>Інвентар:</h4>
      <ul>
        {(() => {
          const inv = normalizeInventory(character.inventory);
          if (inv.type === 'array') {
            return inv.items.map((item, index) => <li key={index}>{item}</li>);
          }
          if (inv.type === 'object') {
            return inv.items.map(([key, item]) => <li key={key}>{item}</li>);
          }
          return <li>Інвентар порожній</li>;
        })()}
      </ul>
    </div>
  );
}
