import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// === БАЗА ДАНИХ ===
const races = [
  { key: "human", name: "Людина", bonus: { charisma: 1 }, description: "Універсальна раса без сильних слабкостей." },
  { key: "elf", name: "Ельф", bonus: { intellect: 2 }, description: "Мудрі та спритні, часто маги чи слідопити." },
  { key: "dwarf", name: "Дворф", bonus: { armor: 2 }, description: "Стійкі, витривалі, чудові воїни." },
  { key: "orc", name: "Орк", bonus: { hp: 2 }, description: "Сильні, агресивні, мають багато життя." },
  { key: "gnome", name: "Гном", bonus: { intellect: 1, charisma: 1 }, description: "Маленькі, але розумні й чарівні." },
  { key: "tiefling", name: "Тіфлінг", bonus: { charisma: 2 }, description: "Мають демонічне коріння, красномовні." },
  { key: "dragonborn", name: "Драконороджений", bonus: { armor: 1, hp: 1 }, description: "Драконяча кров, сильні та захищені." },
  { key: "halfling", name: "Хафлінг", bonus: { charisma: 1, intellect: 1 }, description: "Дружелюбні, удачливі." },
  { key: "goblin", name: "Гоблін", bonus: { armor: 1 }, description: "Хитрі, витривалі." },
  { key: "undead", name: "Нежить", bonus: { hp: 3, charisma: -2 }, description: "Безстрашні, але не надто приємні в спілкуванні." }
];

const classes = [
  { key: "warrior", name: "Воїн", base: { hp: 18, armor: 6, intellect: 4, charisma: 3, dex: 4 }, description: "Сильний і витривалий бійць." },
  { key: "mage", name: "Маг", base: { hp: 10, armor: 2, intellect: 8, charisma: 4, dex: 3 }, description: "Чарівник з потужними закляттями." },
  { key: "archer", name: "Лучник", base: { hp: 13, armor: 4, intellect: 5, charisma: 4, dex: 7 }, description: "Влучний стрілець, майстер дистанційного бою." },
  { key: "bard", name: "Бард", base: { hp: 12, armor: 3, intellect: 5, charisma: 8, dex: 5 }, description: "Музика, слово і магія." },
  { key: "paladin", name: "Паладин", base: { hp: 16, armor: 7, intellect: 4, charisma: 7, dex: 3 }, description: "Святий воїн, захисник добра." },
  { key: "rogue", name: "Плут", base: { hp: 13, armor: 4, intellect: 6, charisma: 5, dex: 8 }, description: "Потайний, швидкий, хитрий." },
  { key: "cleric", name: "Жрець", base: { hp: 15, armor: 5, intellect: 7, charisma: 6, dex: 3 }, description: "Магія лікування й захисту." },
  { key: "barbarian", name: "Варвар", base: { hp: 20, armor: 4, intellect: 2, charisma: 2, dex: 5 }, description: "Дика сила, нестримна лють." },
  { key: "ranger", name: "Рейнджер", base: { hp: 15, armor: 4, intellect: 5, charisma: 4, dex: 8 }, description: "Мисливець, друг природи." },
  { key: "alchemist", name: "Алхімік", base: { hp: 12, armor: 3, intellect: 9, charisma: 3, dex: 4 }, description: "Майстер зілля, експериментатор." }
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateStats(race, charClass) {
  const stats = { ...charClass.base };
  for (let key in race.bonus) {
    stats[key] = (stats[key] || 0) + race.bonus[key];
  }
  Object.keys(stats).forEach(k => {
    stats[k] += Math.floor(Math.random() * 3) - 1; // -1, 0 або +1
    if (stats[k] < 1) stats[k] = 1;
  });
  return stats;
}

const inventoryItems = [
  "Меч", "Лук", "Плащ", "Кинджал", "Ліхтар", "Мішок", "Зілля лікування",
  "Зілля мани", "Амулет", "Гранітна кістка", "Записник пригод", "Магічний жезл"
];

function getRandomInventory() {
  const count = 2 + Math.floor(Math.random() * 3);
  let arr = [];
  while (arr.length < count) {
    const item = getRandomElement(inventoryItems);
    if (!arr.includes(item)) arr.push(item);
  }
  return arr;
}

const api = axios.create({
  baseURL: "https://d-dua.onrender.com/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('dnd_token') || ''}`,
  },
});

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [char, setChar] = useState(null);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(null);
  const navigate = useNavigate();

  // Генеруємо наперед
  const handleGenerate = () => {
    const race = getRandomElement(races);
    const charClass = getRandomElement(classes);
    const stats = generateStats(race, charClass);
    const inventory = getRandomInventory();
    setGenerated({
      race,
      charClass,
      stats,
      inventory,
      imgUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name + race.key + charClass.key)}`
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!generated) handleGenerate();
      const { race, charClass, stats, inventory, imgUrl } = generated || {};

      const res = await api.post("/characters", {
        name,
        bio,
        race: race.name,
        class: charClass.name,
        stats,
        inventory,
        img: imgUrl,
      });

      setChar({ ...res.data, ...generated, name, bio });
    } catch (err) {
      setError("Помилка створення персонажа");
    }
    setLoading(false);
  };

  // Генерувати при першому рендері
  React.useEffect(() => { handleGenerate(); }, []);

  if (char)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl text-dndgold mb-4">Персонаж створений!</h1>
          <img src={char.imgUrl} alt="" className="w-32 h-32 mb-2 rounded-full border-2 border-dndgold bg-white" />
          <div className="text-dndgold text-lg mb-2">{char.name} ({char.race.name}, {char.charClass.name})</div>
          <div className="text-dndgold text-sm mb-2">{char.race.description} | {char.charClass.description}</div>
          <div className="text-dndgold text-xs mb-2">
            <b>Стати:</b>
            <ul>
              {Object.entries(char.stats).map(([stat, value]) => (
                <li key={stat}>{stat}: {value}</li>
              ))}
            </ul>
          </div>
          <div className="text-dndgold text-xs mb-2">
            <b>Інвентар:</b>
            <ul>
              {char.inventory.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => navigate('/characters')}
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-2 px-8 mt-4"
          >
            До списку персонажів
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#322018]/90 p-8 rounded-2xl shadow-dnd max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl text-dndgold mb-4">Створити персонажа</h1>
        <form onSubmit={handleCreate} className="w-full flex flex-col gap-4">
          <input
            type="text"
            required
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Ім'я персонажа"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            className="rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
            placeholder="Коротка передісторія"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
          />
          {generated && (
            <div className="w-full bg-[#20100a]/80 rounded-xl p-3 text-dndgold text-xs mb-2">
              <b>Раса:</b> {generated.race.name} <br />
              <i>{generated.race.description}</i>
              <br />
              <b>Клас:</b> {generated.charClass.name} <br />
              <i>{generated.charClass.description}</i>
              <br />
              <b>Стати:</b>{" "}
              {Object.entries(generated.stats).map(([stat, val]) => (
                <span key={stat}>{stat}: {val} </span>
              ))}
              <br />
              <b>Інвентар:</b> {generated.inventory.join(", ")}
              <br />
              <img src={generated.imgUrl} alt="" className="w-20 h-20 inline rounded-full border-2 border-dndgold bg-white mt-2" />
              <button
                type="button"
                className="block mt-2 underline text-dndgold hover:text-dndred"
                onClick={handleGenerate}
                disabled={loading}
              >
                Згенерувати іншого
              </button>
            </div>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            disabled={loading}
            type="submit"
            className="bg-dndgold hover:bg-dndred text-dndred hover:text-white rounded-2xl py-2 px-8"
          >
            {loading ? "Генерація..." : "Створити"}
          </button>
        </form>
      </div>
    </div>
  );
}
