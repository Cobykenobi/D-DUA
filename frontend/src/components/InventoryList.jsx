import React from 'react';

export default function InventoryList({ inventory }) {
  if (!inventory || !inventory.length) return <div className="text-dndgold/60">Порожньо</div>;
  return (
    <ul className="list-disc pl-6 text-dndgold/90">
      {inventory.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}
