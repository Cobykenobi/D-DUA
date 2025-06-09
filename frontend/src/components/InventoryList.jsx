import React from "react";

export default function InitiativeList({ initiative }) {
  if (!initiative || !initiative.length) return null;
  return (
    <div className="bg-[#20100a]/90 p-2 rounded-2xl mb-4 w-full max-w-xl mx-auto">
      <div className="text-dndgold font-bold mb-1">Ініціатива:</div>
      <ol>
        {initiative
          .sort((a, b) => b.value - a.value)
          .map((item, i) => (
            <li key={i} className="text-dndgold">
              {item.name} ({item.type}): {item.value}
            </li>
        ))}
      </ol>
    </div>
  );
}
