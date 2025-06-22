import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CharacterCard({ character }) {
  const { t } = useTranslation();
  const raceKey =
    typeof character.race === 'string'
      ? character.race
      : character.race?.code;

  return (
    <div className='character-card'>
      <h3>{character.name}</h3>
      <p>
        {raceKey
          ? t(`races.${raceKey.toLowerCase()}`, character.race?.name || raceKey)
          : t('unknown')}
      </p>
      <p>
        {t(
          `classes.${(
            character.profession?.code || character.profession || ''
          ).toLowerCase()}`,
          character.profession?.name || character.profession
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
