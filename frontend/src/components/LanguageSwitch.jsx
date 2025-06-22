import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ua' ? 'en' : 'ua';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <button onClick={toggleLanguage} style={{ marginLeft: '1rem' }}>
      🌐 {i18n.language === 'ua' ? 'EN' : 'UA'}
    </button>
  );
};

export default LanguageSwitch;
