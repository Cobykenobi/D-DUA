import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Dice5 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DiceBox({ className = '' }) {
  const [diceResult, setDiceResult] = useState(null);
  const [diceAnim, setDiceAnim] = useState(false);
  const { t } = useTranslation();

  const rollDice = (type = 'd20') => {
    setDiceResult(null);
    setDiceAnim(true);

    const audio = new Audio('/dice.mp3');
    audio.play().catch(() => {});

    setTimeout(() => {
      const res = type === 'd20'
        ? Math.ceil(Math.random() * 20)
        : Math.ceil(Math.random() * 6);
      setDiceResult(res);
      setDiceAnim(false);
    }, 800);
  };

  return (
    <div className={`border border-dndgold rounded-2xl p-2 bg-[#25160f]/80 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <button
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
            onClick={() => rollDice('d20')}
          >

            {t('roll_dice_d20')}

          </button>
          <button
            className="bg-dndred hover:bg-dndgold text-white hover:text-dndred font-dnd rounded-2xl px-4 py-2 transition-all"
            onClick={() => rollDice('d6')}
          >

            {t('roll_dice_d6')}

          </button>
        </div>
        {diceAnim && (
          <motion.div
            key="dice"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-dndgold"
          >
            <Dice5 size={36} />
          </motion.div>
        )}

          <div className="text-xl text-dndgold font-bold mt-2">{t('roll_result')}: {diceResult}</div>

        )}
      </div>
    </div>
  );
}
