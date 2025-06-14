
import i18n from '../i18n';

export default function LanguageSwitch() {
  const changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="text-sm space-x-2 text-white">
      <button onClick={() => changeLanguage("ua")} className="hover:underline">UA</button>
      <span>|</span>
      <button onClick={() => changeLanguage("en")} className="hover:underline">EN</button>
    </div>
  );
}
