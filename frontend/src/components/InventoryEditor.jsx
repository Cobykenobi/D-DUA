
import { useState } from 'react';

export default function InventoryEditor({ inventory, onChange }) {
  const [items, setItems] = useState(Array.isArray(inventory) ? inventory : []);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (!input.trim()) return;
    const newItems = [...items, input.trim()];
    setItems(newItems);
    onChange(newItems);
    setInput('');
  };

  const removeItem = (idx) => {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="rounded-2xl px-3 py-1 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
          placeholder="Новий предмет"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="button" onClick={addItem} className="bg-dndgold text-dndred font-dnd rounded-2xl px-3">+</button>
      </div>
      <ul className="list-disc pl-6 text-dndgold/90">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 mb-1">
            <span>{item}</span>
            <button type="button" onClick={() => removeItem(i)} className="text-dndred font-bold">✗</button>
          </li>
        ))}
        {!items.length && <li className="text-dndgold/60">Порожньо</li>}
      </ul>
    </div>
  );
}
