import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CharacterCard({ character }) {
  const { t } = useTranslation();

  return (
    <div className='character-card'>
      <h3>{character.name}</h3>
      <p>
        {t(
          `races.${(character.race?.code || character.race || '').toLowerCase()}`,
          character.race?.name || character.race
        )}
      </p>
      <p>
        {t(
          `classes.${(
            character.class?.code || character.class || ''
          ).toLowerCase()}`,
          character.class?.name || character.class
        )}
      </p>
      <ul>
        {Object.entries(character.stats || {}).map(([key, value]) => (
          <li key={key}>
            {t(`stats.${key.toLowerCase()}`, key)}: {value}
          </li>
        ))}
      </ul>
      <h4>Інвентар:</h4>
      <ul>
        {(character.inventory || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
