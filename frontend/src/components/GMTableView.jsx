import MapViewer from './MapViewer';
import PlayerStatusTable from './PlayerStatusTable';
import { useGameState } from '../context/GameStateContext';

export default function GMTableView({ players, isGM }) {
  const { map } = useGameState();
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <MapViewer mapUrl={map} />
      <PlayerStatusTable players={players} isGM={isGM} />
    </div>
  );
}
