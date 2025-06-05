// frontend/src/pages/RegisterPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!login || !password) return setError("Login and password are required");
    if (password !== password2) return setError("Passwords do not match");
    try {
      await axios.post("/api/auth/register", { login, password });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dndbg">
      <form
        onSubmit={handleRegister}
        className="bg-[#2e1b13]/90 rounded-2xl p-8 w-96 flex flex-col space-y-4 shadow-lg"
      >
        <h2 className="text-3xl text-center text-dndgold font-dnd mb-2">
          Створи акаунт
        </h2>
        <input
          className="w-full rounded-2xl px-3 py-2 bg-[#25160f] text-dndgold border border-dndgold"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="w-full rounded-2xl px-3 py-2 bg-[#25160f] text-dndgold border border-dndgold"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full rounded-2xl px-3 py-2 bg-[#25160f] text-dndgold border border-dndgold"
          placeholder="Повторіть пароль"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}
        <button className="bg-dndred rounded-2xl py-2 mt-2 text-dndgold font-bold hover:bg-dndgold hover:text-dndred transition-all">
          Зареєструватись
        </button>
        <Link to="/login" className="text-center text-dndgold hover:underline">
          Вже є акаунт?
        </Link>
      </form>
    </div>
  );
}
