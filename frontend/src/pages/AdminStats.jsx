import React from "react";

export default function AdminStats({ data }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.race}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
