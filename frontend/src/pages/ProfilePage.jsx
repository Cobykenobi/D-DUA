
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import LanguageSwitch from '../components/LanguageSwitch';
import CharacterCard from '../components/CharacterCard';
import { getCharacters, deleteCharacter, updateCharacter } from '../utils/api';
import api from '../api/axios';
import { useUserStore } from '../store/user';
import { useTranslation } from 'react-i18next';

import translateOrRaw from '../utils/translateOrRaw.js';
import { useAppearance } from '../context/AppearanceContext';
import { normalizeInventory } from '../utils/inventoryUtils';
import translateEffect from '../utils/effectUtils';


const ProfilePage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setCharacters([]);
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      }
    };
    fetchChars();
  }, []);

  const handleCreate = () => {
    if (user?.role === 'gm') {
      navigate('/gm-dashboard');
    } else {
      navigate('/create-character');
    }
  };
  const handleSelect = (charId) => navigate(`/lobby?char=${charId}`);
  const handleDelete = async (id) => {
    await deleteCharacter(id);
    setCharacters((prev) => prev.filter((c) => c._id !== id));
  };

  const handleSaveDescription = async (id, desc) => {
    const updated = await updateCharacter(id, { description: desc });
    setCharacters(prev => prev.map(c => c._id === id ? updated : c));
  };

  const openTable = (id) => {
    navigate(`/gm-table/${id}`);
  };

  const createTable = async () => {
    try {
      const res = await api.post('/table');
      const { tableId } = res.data;
      openTable(tableId);
    } catch {
      // fail silently
    }
  };

  const { background } = useAppearance();
  return (
    <div
      className="relative min-h-screen bg-dndbg bg-cover bg-center flex flex-col items-center p-6 font-dnd text-dndgold text-shadow"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
        <button
          onClick={() => navigate('/login')}
          className="bg-dndgold hover:bg-dndred text-dndred hover:text-white font-dnd rounded-2xl px-4 py-2 transition active:scale-95"
        >
          {t('back')}
        </button>
        <LogoutButton />
        <LanguageSwitch />
      </div>
      <h2 className="text-2xl mb-4 text-shadow">{t('your_characters')}</h2>
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleCreate}
          className="bg-dndgold text-dndred rounded-2xl px-4 py-2 font-semibold transition active:scale-95"
        >
          {t('create_new')}
        </button>
        {user?.role === 'gm' && (
          <button
            onClick={createTable}
            className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-2xl px-4 py-2 font-semibold transition active:scale-95"
          >
            {t('create_table')}
          </button>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4 max-w-5xl overflow-y-auto">
        {characters.length === 0 ? (
          <div className="col-span-full text-center text-dndgold/80">
            {t('empty_profile')}
          </div>
        ) : (
          characters.map((char) => {
            const raceCode =
              typeof char.race === 'string'
                ? char.race
                : char.race?.code || '';
            const classCode =
              typeof char.profession === 'string'
                ? char.profession
                : char.profession?.code || '';
            const genderCode = (char.gender || '').toLowerCase();
            const raceKeyLower = (raceCode || '')
              .toLowerCase()
              .replace(/_(male|female)$/, '');
            const classKeyLower = (classCode || '').toLowerCase();
            const raceName = char.race?.name || raceCode;
            const className = char.profession?.name || classCode;
            return (
              <div key={char._id} className="flex flex-col items-center">
                <CharacterCard
                  character={char}
                  stats={char.stats}
                  inventory={char.inventory}
                  editLabel={t('enter')}
                  onEdit={() => handleSelect(char._id)}
                  onDelete={() => handleDelete(char._id)}
                  onSaveDescription={handleSaveDescription}
                />
                <div className="text-xs mt-1">
                  {translateOrRaw(t, 'gender.' + genderCode, genderCode)}
                </div>
                <div className="text-xs">
                  {translateOrRaw(t, `races.${raceKeyLower}`, raceName)} /{' '}
                  {translateOrRaw(t, `classes.${classKeyLower}`, className)}
                </div>
                {char.stats && (
                  <ul className="list-none pl-0 text-xs space-y-0.5 mt-1">
                    {Object.entries(char.stats).map(([key, value]) => (
                      <li key={key}>
                        {translateOrRaw(t, `stats.${key.toLowerCase()}`, key)}: {value}
                      </li>
                    ))}
                  </ul>
                )}
                <h4 className="text-xs mt-1">{t('inventory')}</h4>
                <ul className="list-disc pl-4 text-xs space-y-0.5">
                  {(() => {
                    const inv = normalizeInventory(char.inventory);
                    if (inv.type === 'array' && inv.items.length > 0) {
                      return inv.items.map((it, idx) => {
                        const bonusData =
                          it.bonus &&
                          typeof it.bonus === 'object' &&
                          Object.keys(it.bonus).length
                            ?
                                ' (' +
                                Object.entries(it.bonus)
                                  .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase(), k)}`)
                                  .join(', ') +
                                ')'
                            : '';
                        return (
                          <li key={idx}>
                            {translateOrRaw(t, `item.${(it.code || it.item).toLowerCase()}`, it.item)}
                            {it.amount > 1 ? ` x${it.amount}` : ''}
                            {bonusData}
                            {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                          </li>
                        );
                      });
                    }
                    if (inv.type === 'object' && inv.items.length > 0) {
                      return inv.items.map(([key, it]) => {
                        const bonusData =
                          it.bonus &&
                          typeof it.bonus === 'object' &&
                          Object.keys(it.bonus).length
                            ?
                                ' (' +
                                Object.entries(it.bonus)
                                  .map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${translateOrRaw(t, 'stats.' + k.toLowerCase(), k)}`)
                                  .join(', ') +
                                ')'
                            : '';
                        return (
                          <li key={key}>
                            {translateOrRaw(t, `item.${(it.code || it.item).toLowerCase()}`, it.item)}
                            {it.amount > 1 ? ` x${it.amount}` : ''}
                            {bonusData}
                            {it.effect ? ` (${translateEffect(it.effect, t)})` : ''}
                          </li>
                        );
                      });
                    }
                    return <li>{t('inventory_ui.empty')}</li>;
                  })()}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
