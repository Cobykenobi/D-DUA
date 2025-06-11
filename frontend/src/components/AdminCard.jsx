import React from "react";

export default function AdminCard({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-yellow-700 to-red-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:brightness-110 transition"
    >
      {title}
    </button>
  );
}
