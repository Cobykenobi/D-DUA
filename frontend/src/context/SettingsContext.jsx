import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [brightness, setBrightness] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [language, setLanguage] = useState("ua");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("settings"));
    if (stored) {
      setBrightness(stored.brightness ?? 1);
      setVolume(stored.volume ?? 0.5);
      setLanguage(stored.language ?? "ua");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify({ brightness, volume, language }));
  }, [brightness, volume, language]);

  return (
    <SettingsContext.Provider value={{ brightness, setBrightness, volume, setVolume, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);