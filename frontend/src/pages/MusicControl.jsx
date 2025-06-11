import React, { useRef } from "react";

export default function MusicControl() {
  const ref = useRef();

  return (
    <div className="p-4 bg-dndbg text-dndgold rounded-lg">
      <h2 className="text-xl mb-2">🎵 Фонова музика</h2>
      <input
        type="text"
        placeholder="Вставте YouTube Embed URL"
        className="w-full p-2 rounded bg-white text-black mb-2"
        onChange={(e) => {
          ref.current.src = e.target.value;
        }}
      />
      <iframe
        ref={ref}
        width="100%"
        height="200"
        src=""
        title="YouTube Music"
        frameBorder="0"
        allow="autoplay"
      />
    </div>
  );
}
