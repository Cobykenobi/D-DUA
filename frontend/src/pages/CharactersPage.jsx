import React from "react";
import { useUserStore } from "../store/user";

export default function CharactersPage() {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen p-6 text-dndgold font-dnd">
      <h1 className="text-3xl mb-4">Персонажі гравця {user?.login}</h1>
      <div className="border border-dndgold p-4 rounded">
        {/* Тут буде список персонажів */}
        <p>Список персонажів поки порожній.</p>
        <button className="mt-4 px-4 py-2 bg-dndred text-white rounded hover:bg-dndgold hover:text-dndred transition">
          Створити нового
        </button>
      </div>
    </div>
  );
}
