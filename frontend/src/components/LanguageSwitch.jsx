
export default function LanguageSwitch() {
  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <div className="text-sm space-x-2 text-white">
      <button onClick={() => changeLanguage("ua")} className="hover:underline">UA</button>
      <span>|</span>
      <button onClick={() => changeLanguage("en")} className="hover:underline">EN</button>
    </div>
  );
}