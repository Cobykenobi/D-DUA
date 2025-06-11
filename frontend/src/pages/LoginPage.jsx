
import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useSettings } from "../context/SettingsContext";
import { useTranslation } from "react-i18next";

import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/user";
import api from "../api/axios";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const { setBrightness, setVolume, setLanguage } = useSettings();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const setUser = useUserStore((s) => s.setUser);

  const handleSubmit = async (e) => {
    setError(null);
    if (!email || !password) {
      showToast(t('fields_required'), "error");
      return;
    }
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { login, password });
      setUser(res.data.user, res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/map-bg.jpg')`,
      }}
    >
      <div className="bg-[#2d1d14]/90 p-8 rounded-lg shadow-lg w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-dnd mb-4">Ласкаво просимо до D&D 5051</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="text-red-400">{error}</div>}
          <input
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            placeholder="Кодове ім’я"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            className="p-2 rounded bg-[#3c2a20] text-white placeholder:text-gray-300"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 rounded py-2 text-white font-bold"
          >
            Увійти
          </button>
        </form>
        <Link
          to="/register"
          className="mt-4 inline-block text-dndgold underline text-sm"
        >
          Нова легенда?
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
