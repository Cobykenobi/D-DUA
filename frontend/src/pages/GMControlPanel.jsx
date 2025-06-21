import React from 'react';
import { useParams } from 'react-router-dom';

export default function GMControlPanel() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-dndbg text-dndgold font-dnd">
      <h1 className="text-3xl">GM Control Panel for table {id}</h1>
    </div>
  );
}
