import { useState } from 'react';

export default function DiceBox({ className = '' }) {
  const [diceResult, setDiceResult] = useState(null);
  const [diceAnim, setDiceAnim] = useState(false);

  const rollDice = (type = 'd20') => {
    setDiceAnim(true);
    setTimeout(() => {
      setDiceAnim(false);
      const res = type === 'd20'
        ? Math.ceil(Math.random() * 20)
        : Math.ceil(Math.random() * 6);
      setDiceResult(res);
    }, 600);
  };

  return (
    <div className={`border border-dndgold rounded-2xl p-2 bg-[#25160f]/80 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <button
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
            onClick={() => rollDice('d20')}
          >
            Кинути D20
          </button>
          <button
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
            onClick={() => rollDice('d6')}
          >
            Кинути D6
          </button>
        </div>
        {diceAnim && (
          <div className="animate-bounce text-3xl text-dndgold mt-2"> ...</div>
        )}
        {diceResult && !diceAnim && (
          <div className="text-xl text-dndgold font-bold mt-2">Результат: {diceResult}</div>
        )}
      </div>
    </div>
  );
}
