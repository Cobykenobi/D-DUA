import React from 'react';

const classMap = {
  Paladin: 'Паладин',
  Rogue: 'Шпигун',
  Mage: 'Маг',
  Warrior: 'Воїн',
  Ranger: 'Рейнджер',
};

const raceMap = {
  Lizardman: 'Ящер',
  Elf: 'Ельф',
  Orc: 'Орк',
  Human: 'Людина',
  Dwarf: 'Гном',
};

const statMap = {
  strength: 'Сила',
  defense: 'Захист',
  health: 'Здоров\'я',
  intelligence: 'Інтелект',
  agility: 'Спритність',
  charisma: 'Харизма',
};

const CharacterCard = ({ character, onDelete, onEnter, onSaveDescription }) => {
  return (
    <div className="character-card">
      <div className="header">
        <img src="/default-avatar.png" alt="avatar" className="avatar" />
        <h3>{character.name}</h3>
        <p>Раса: <strong>{raceMap[character.race] || character.race}</strong></p>
        <p>Клас: <strong>{classMap[character.class] || character.class}</strong></p>
      </div>

      <div className="description">
        <label>Опис:</label>
        <textarea 
          defaultValue={character.description || ''} 
          onBlur={(e) => onSaveDescription(character.id, e.target.value)}
        />
        <button onClick={() => onSaveDescription(character.id)}>Зберегти опис</button>
      </div>

      <div className="stats">
        <h4>Стати:</h4>
        <ul>
          {Object.entries(character.stats).map(([key, value]) => (
            <li key={key}><strong>{statMap[key] || key}</strong>: {value}</li>
          ))}
        </ul>
      </div>

      <div className="inventory">
        <h4>Інвентар:</h4>
        <ul>
          {character.inventory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="actions">
        <button onClick={() => onEnter(character.id)}>Увійти</button>
        <button onClick={() => onDelete(character.id)} className="danger">Видалити</button>
      </div>
    </div>
  );
};

export default CharacterCard;
