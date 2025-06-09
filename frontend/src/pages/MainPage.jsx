import React from "react";
import { useUserStore } from "../store/user";

export default function MainPage() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-dndgold text-xl font-dnd">
        Завантаження...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-dndbg text-dndgold font-dnd text-2xl">
      Вітаю, {user.login}!
    </div>
  );
}
