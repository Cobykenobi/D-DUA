
export default function SettingsPanel() {
  const { brightness, setBrightness, volume, setVolume, language, setLanguage } = useSettings();

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">⚙️ Налаштування</h2>

      <div className="mb-4">
        <label className="block mb-1"> Яскравість: {brightness}</label>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={brightness}
          onChange={(e) => setBrightness(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1"> Гучність: {volume}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block mb-1"> Мова:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            localStorage.setItem("lang", e.target.value);
            window.location.reload();
          }}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="ua">Українська</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}