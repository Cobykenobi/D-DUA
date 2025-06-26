import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
  const [background, setBackground] = useState('');
  const [theme, setTheme] = useState('light');

  const fetchAppearance = async () => {
    try {
      const res = await api.get('/appearance');
      setBackground(res.data.background || '');
      setTheme(res.data.theme || 'light');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchAppearance(); }, []);

  useEffect(() => {
    if (background) {
      document.documentElement.style.setProperty('--bg-image', `url('${background}')`);
    }
  }, [background]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const updateTheme = async (t) => {
    setTheme(t);
    try {
      await api.put('/appearance', { theme: t });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppearanceContext.Provider value={{ background, theme, setTheme: updateTheme, refreshAppearance: fetchAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export const useAppearance = () => useContext(AppearanceContext);
