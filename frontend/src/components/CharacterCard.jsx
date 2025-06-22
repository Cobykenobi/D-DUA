// CharacterCard.jsx (patched with UA localization)
import React from 'react';
import { useTranslation } from 'react-i18next';

const raceMap = {
  Human: 'Людина',
  Elf: 'Ельф',
  Orc: 'Орк',
  Dwarf: 'Гном',
  Lizardman: 'Ящір',
};

const classMap = {
  Paladin: 'Паладин',
  Rogue: 'Шпигун',
  Warrior: 'Воїн',
  Mage: 'Маг',
};

const statMap = {
  health: "Здоров'я",
  strength: 'Сила',
  defense: 'Захист',
  intelligence: 'Інтелект',
  agility: 'Спритність',
  charisma: 'Харизма',
};

export default function CharacterCard({ character }) {
  const { i18n } = useTranslation();

  return (
    <div className='character-card'>
      <h3>{character.name}</h3>
      <p>Раса: {raceMap[character.race] || character.race}</p>
      <p>Клас: {classMap[character.class] || character.class}</p>
      <ul>
        {Object.entries(character.stats || {}).map(([key, value]) => (
          <li key={key}>
            {statMap[key] || key}: {value}
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
