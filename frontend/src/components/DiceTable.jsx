import React, { useState } from "react";

const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"];

export default function DiceTable({ isMaster }) {
  const [lastRoll, setLastRoll] = useState(null);

  const roll = (type) => {
    const max = parseInt(type.substring(1));
    const result = Math.floor(Math.random() * max) + 1;
    setLastRoll(result);
  };

  return (
    <div className="p-4 bg-dndbg text-dndgold rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl mb-2 text-center">🎲 Кидок кубика</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {diceTypes.map((d) => (
          <button
            key={d}
            onClick={() => roll(d)}
            className="px-3 py-2 bg-dndred text-white rounded hover:bg-dndgold hover:text-dndred"
          >
            {d}
          </button>
        ))}
      </div>
      {lastRoll && (
        <div className="mt-4 text-center">
          <span className="text-lg">Результат: <b>{lastRoll}</b></span>
        </div>
      )}
    </div>
  );
}
