import api from "../api/axios";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const diceTypes = ["d20", "d12", "d10", "d8", "d6", "d4"];

export default function DiceRoller({ sessionId, isGM }) {
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);
  const { t } = useTranslation();

  const rollDice = async (diceType, isPrivate = false) => {
    setRolling(true);
    try {
      const res = await api.post("/rolls", {
        diceType,
        isPrivate,
        session: sessionId,
      });
      setLastRoll(res.data.value ?? "???");
    } catch (err) {
      console.error("Roll error:", err);
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
            onClick={() => rollDice(dt, isGM)}
            disabled={rolling}
            className={`bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-3 py-2 transition-all ${rolling ? "opacity-60" : ""}`}
          >
            {dt}
            {isGM && <span className="text-xs ml-1"></span>}
          </button>
        ))}
      </div>
      {lastRoll !== null && (
        <div className="text-dndgold text-lg font-dnd mt-1">

          {t('result')}: <b>{lastRoll}</b>
        </div>
      )}
      <div className="text-xs text-dndgold/60 mt-2">
        {isGM ? t('roll_info_gm') : t('roll_info_all')}

      </div>
    </div>
  );
}
