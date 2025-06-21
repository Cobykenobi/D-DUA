import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [brightness, setBrightness] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [language, setLanguage] = useState("ua");
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("settings"));
    if (stored) {
      setBrightness(stored.brightness ?? 1);
      setVolume(stored.volume ?? 0.5);
      setLanguage(stored.language ?? "ua");
      setTheme(stored.theme ?? 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ brightness, volume, language, theme })
    );
  }, [brightness, volume, language, theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const save = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        await api.put('/user/settings', { volume, brightness });
      } catch (e) {
        console.error(e);
      }
    };
    save();
  }, [volume, brightness]);

  return (
    <SettingsContext.Provider value={{
      brightness,
      setBrightness,
      volume,
      setVolume,
      language,
      setLanguage,
      theme,
      setTheme,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);