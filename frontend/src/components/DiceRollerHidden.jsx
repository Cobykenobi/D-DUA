import { useState } from 'react';
import api from "../api/axios";
import { useTranslation } from 'react-i18next';

const diceTypes = ["d20", "d12", "d10", "d8", "d6", "d4"];

export default function DiceRollerHidden({ sessionId }) {
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);
  const { t } = useTranslation();

  const rollDice = async (type) => {
    setRolling(true);
    try {
      const res = await api.post("/rolls", {
        diceType: type,
        isPrivate: true,
        session: sessionId,
      });
      setLastRoll(res.data.value ?? "???");
    } catch (err) {
      console.error("Hidden roll error:", err);
    } finally {
      setRolling(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 mb-2">
        {diceTypes.map((dt) => (
          <button
            key={dt}
            onClick={() => rollDice(dt)}
            disabled={rolling}
            className={`bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-3 py-2 transition-all ${rolling ? 'opacity-60' : ''}`}
          >
            {dt}
          </button>
        ))}
      </div>
      {lastRoll !== null && (
        <div className="text-dndgold text-lg font-dnd mt-1">
          {t('roll_result')}: <b>{lastRoll}</b>
        </div>
      )}
      <div className="text-xs text-dndgold/60 mt-2">
        {t('roll_visibility_gm')}
      </div>
    </div>
  );
}

