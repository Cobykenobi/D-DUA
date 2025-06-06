import React, { useState } from 'react';
import axios from 'axios';

const diceTypes = ["d20", "d12", "d10", "d8", "d6", "d4"];

export default function DiceRoller({ token, sessionId, isMaster }) {
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);

  const rollDice = async (diceType, isPrivate = false) => {
    setRolling(true);
    try {
      const res = await axios.post('/api/rolls', {
        diceType,
        isPrivate,
        session: sessionId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLastRoll(res.data.value !== null ? res.data.value : '???');
    } finally {
      setRolling(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 mb-2">
        {diceTypes.map(dt => (
          <button
            key={dt}
            onClick={() => rollDice(dt, isMaster)}
            disabled={rolling}
            className={`bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-3 py-2 transition-all ${rolling ? 'opacity-60' : ''}`}
          >
            {dt}
            {isMaster && <span className="text-xs ml-1">🔒</span>}
          </button>
        ))}
      </div>
      {lastRoll !== null && (
        <div className="text-dndgold text-lg font-dnd mt-1">Результат: <b>{lastRoll}</b></div>
      )}
      <div className="text-xs text-dndgold/60 mt-2">
        {isMaster ? 'Ваш кидок бачить лише майстер' : 'Кидок бачать усі гравці'}
      </div>
    </div>
  );
}
