
import { useTranslation } from 'react-i18next';
import translateOrRaw from '../utils/translateOrRaw';
import translateEffect from '../utils/effectUtils';

export default function InventoryList({ items, filter = 'all' }) {
  const { t } = useTranslation();
  if (!items || !items.length) return null;

  const filtered =
    filter === 'all'
      ? items
      : items.filter((it) => {
          const type = typeof it === 'string' ? 'misc' : it.type || 'misc';
          return type === filter;
        });

  if (!filtered.length) return null;

  return (
    <div className="bg-[#20100a]/90 p-2 rounded-2xl mb-4 w-full max-w-xl mx-auto">
      <div className="text-dndgold font-bold mb-1">{t('inventory.title')}</div>
      <ul className="list-disc pl-5">
        {filtered.map((item, i) => (
          <li key={i} className="text-dndgold">


            {translateOrRaw(t, `item.${(item.code || item.item || item.name || item).toLowerCase()}`, item.item || item.name || item)}


            {item.amount ? `x${item.amount}` : ''}
            {item.effect ? ` (${translateEffect(item.effect, t)})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
