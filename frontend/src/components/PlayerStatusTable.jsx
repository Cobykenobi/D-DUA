import { useGameState } from '../context/GameStateContext';

import { useState } from 'react';

export default function PlayerStatusTable({ players, isGM, onKick }) {
  const { hp, mp, updateHp, updateMp } = useGameState();
  const [dmg, setDmg] = useState({});

  const applyDamage = (uid) => {
    const val = Number(dmg[uid]);
    if (!Number.isNaN(val) && val !== 0) {
      updateHp(uid, (hp[uid] ?? 0) + val);
    }
    setDmg((d) => ({ ...d, [uid]: '' }));
  };
  return (
    <table className="text-dndgold text-sm w-full">
      <thead>
        <tr>
          <th className="text-left">Гравець</th>
          <th className="text-left">HP</th>
          <th className="text-left">MP</th>
          <th className="text-left">AC</th>
          {isGM && <th className="text-left">Урон</th>}
          <th className="text-left">Статус</th>
          {isGM && (onKick ? <th className="text-left">Kick</th> : null)}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(players) && players.map(p => (
          <tr key={p.user} className="border-t border-dndgold/20">
            <td>{p.name}</td>
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
            {isGM && (
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
            )}
            <td>{p.status || ''}</td>
            {isGM && onKick && (
              <td>
                <button
                  type="button"
                  onClick={() => onKick(p.user)}
                  className="bg-dndred text-white rounded px-2 py-1"
                >
                  Kick
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
