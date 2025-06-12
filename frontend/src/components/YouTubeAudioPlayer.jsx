import React, { useEffect, useRef } from 'react';

const YouTubeAudioPlayer = ({ videoId, volume = 50 }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      // Мутація для приховування відео
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
    };

    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`}
      allow="autoplay"
      title="YouTube Audio"
    />
  );
};

export default YouTubeAudioPlayer;