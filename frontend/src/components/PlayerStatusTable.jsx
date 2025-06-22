import { useGameState } from '../context/GameStateContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import translateOrRaw from '../utils/translateOrRaw';

export default function PlayerStatusTable({ players, isGM, onEdit, onKick }) {

  const { hp, mp, updateHp, updateMp } = useGameState();
  const { t } = useTranslation();
  const [dmg, setDmg] = useState({});

  const applyDamage = (uid) => {
    const val = Number(dmg[uid]);
    if (!Number.isNaN(val) && val !== 0) {
      updateHp(uid, (hp[uid] ?? 0) + val);
    }
    setDmg((d) => ({ ...d, [uid]: '' }));
  };
  const formatStats = (s) => {
    if (!s) return '-';
    const arr = [
      `STR:${s.strength ?? '-'}`,
      `INT:${s.intellect ?? '-'}`,
      `AGI:${s.agility ?? '-'}`,
      `CHA:${s.charisma ?? '-'}`
    ];
    return arr.join(' ');
  };
  return (
    <table className="text-dndgold text-sm w-full">
      <thead>
        <tr>
          <th className="text-left">{t('player')}</th>

          <th className="text-left">ID</th>
          <th className="text-left">{t('name')}</th>
          <th className="text-left">{t('race')}</th>
          <th className="text-left">{t('class')}</th>
          <th className="text-left">HP</th>
          <th className="text-left">MP</th>
          <th className="text-left">AC</th>
          <th className="text-left">{t('stats_label')}</th>
          {isGM && <th className="text-left">DMG</th>}
          {isGM && <th className="text-left">{t('actions')}</th>}

        </tr>
      </thead>
      <tbody>
        {Array.isArray(players) && players.map(p => {
          const raceKey =
            typeof p.character?.race === 'string'
              ? p.character.race
              : p.character?.race?.code || p.character?.race?.name || '';
          const race = translateOrRaw(t, `races.${(raceKey || '').toLowerCase()}`, raceKey);
          const clsKey =
            typeof p.character?.profession === 'string'
              ? p.character.profession
              : p.character?.profession?.code || p.character?.profession?.name || '';
          const cls = translateOrRaw(t, `classes.${(clsKey || '').toLowerCase()}`, clsKey);
          return (
            <tr key={p.user} className="border-t border-dndgold/20">
              <td>{p.name || '-'}</td>
              <td>{p.user}</td>
              <td>{p.character?.name || '-'}</td>
              <td>{race}</td>
              <td>{cls}</td>
              <td>
                {isGM ? (
                  <input
                    type="number"
                    value={hp[p.user] ?? ''}
                    onChange={e => updateHp(p.user, Number(e.target.value))}
                    className="w-16 text-black rounded"
                  />
                ) : (
                  hp[p.user] ?? '-'
                )}
              </td>

              <td>
                {isGM ? (
                  <input
                    type="number"
                    value={mp[p.user] ?? ''}
                    onChange={e => updateMp(p.user, Number(e.target.value))}
                    className="w-16 text-black rounded"
                  />
                ) : (
                  mp[p.user] ?? '-'
                )}
              </td>
              <td>{p.character?.stats?.defense ?? '-'}</td>
              <td>{formatStats(p.character?.stats)}</td>
              {isGM && (
                <>
                  <td>
                    <input
                      type="number"
                      value={dmg[p.user] ?? ''}
                      onChange={e =>
                        setDmg(d => ({ ...d, [p.user]: e.target.value }))
                      }
                      onBlur={() => applyDamage(p.user)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') applyDamage(p.user);
                      }}
                      className="w-16 text-black rounded"
                    />
                  </td>
                  <td>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(p)}
                        className="bg-dndgold text-dndred font-dnd rounded px-2 py-1 mr-1"
                      >
                        {t('edit')}
                      </button>
                    )}
                    {onKick && (
                      <button
                        onClick={() => onKick(p.user)}
                        className="bg-dndred text-white rounded px-2 py-1"
                      >
                        Kick
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          );
        })}

      </tbody>
    </table>
  );
}
