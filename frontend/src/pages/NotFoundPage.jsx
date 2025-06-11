import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-dnd">
      <h1 className="text-5xl mb-4 text-dndgold">404</h1>
      <p className="text-lg mb-6">Сторінку не знайдено.</p>
      <Link to="/" className="text-red-500 underline">Повернутись на головну</Link>
    </div>
  );
}