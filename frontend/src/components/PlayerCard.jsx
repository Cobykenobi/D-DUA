import React from "react";

export default function PlayerCard({ player }) {
  return (
    <div className="bg-[#25160f]/80 rounded-2xl p-4 flex flex-col items-center text-dndgold w-40">
      <div className="w-16 h-16 rounded-full bg-white mb-2 overflow-hidden flex items-center justify-center">
        <img
          src={player.avatar || "/default-avatar.png"}
          alt="avatar"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="font-bold">{player.name || player.login}</div>
      <div className="text-xs mt-1">ID: {player._id || player.id}</div>
      <div className="text-xs">
        Онлайн: <span className={player.online ? "text-green-400" : "text-red-400"}>
          {player.online ? "Так" : "Ні"}
        </span>
      </div>
    </div>
  );
}
