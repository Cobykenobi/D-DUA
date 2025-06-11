import React from "react";

export default function PlayerCard({ player }) {
  return (
    <div className="bg-[#25160f]/80 rounded-2xl p-4 flex flex-col items-center text-dndgold w-48 shadow-lg hover:scale-105 transition-all duration-300">
      <div className="w-20 h-20 rounded-full bg-white mb-3 overflow-hidden flex items-center justify-center border-2 border-dndgold">
        <img
          src={player.avatar || "/default-avatar.png"}
          alt="avatar"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="font-bold text-lg">{player.name || player.login}</div>
      <div className="text-sm mt-1 italic text-gray-300">
        {player.race?.name || "Раса не вказана"} — {player.profession?.name || "Клас не вказаний"}
      </div>
      <div className="text-xs mt-1 text-gray-400">HP: {player.hp || "??"}</div>
      <div className="text-xs">
        Онлайн:
        <span className={player.online ? "text-green-400" : "text-red-400"}>
          {" "}
          {player.online ? "Так" : "Ні"}
        </span>
      </div>
    </div>
  );
}
