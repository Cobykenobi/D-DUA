import { useSettings } from '../context/SettingsContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useSettings();
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <button
      onClick={toggle}
      className="text-dndgold hover:text-white transition"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌞' : '🌜'}
    </button>
  );
}
