
export default function InventoryList({ items }) {
  if (!items || !items.length) return null;

  return (
    <div className="bg-[#20100a]/90 p-2 rounded-2xl mb-4 w-full max-w-xl mx-auto">
      <div className="text-dndgold font-bold mb-1">Інвентар:</div>
      <ul className="list-disc pl-5">
        {items.map((item, i) => (
          <li key={i} className="text-dndgold">
            {item.item || item.name} {item.amount ? `x${item.amount}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
