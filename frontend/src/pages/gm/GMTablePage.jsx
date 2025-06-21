import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/user';
import { GameStateProvider, useGameState } from '../../context/GameStateContext';
import MapViewer from '../../components/MapViewer';

function FullscreenMap() {
  const { map } = useGameState();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MapViewer mapUrl={map} />
    </div>
  );
}

export default function GMTablePage() {
  const { tableId } = useParams();
  const { user } = useUserStore();
  return (
    <GameStateProvider tableId={tableId} user={user}>
      <FullscreenMap />
    </GameStateProvider>
  );
}
