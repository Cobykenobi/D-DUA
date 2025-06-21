import { useGameState } from '../context/GameStateContext';

export default function PlayerStatusTable({ players, isGM }) {
  const { hp, updateHp } = useGameState();
  return (
    <table className="text-dndgold text-sm w-full">
      <thead>
        <tr>
          <th className="text-left">Гравець</th>
          <th className="text-left">HP</th>
          <th className="text-left">Статус</th>
        </tr>
      </thead>
      <tbody>
        {players.map(p => (
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
            <td>{p.status || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
