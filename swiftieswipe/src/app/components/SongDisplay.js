'use client';

import { useState } from 'react';

const SongDisplay = ({ song, onNext }) => {
  const [savedSongs, setSavedSongs] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem('savedSongs')) || [];
    }
    return [];
  });

  const handleSave = () => {
    const updatedSongs = [...savedSongs, song];
    setSavedSongs(updatedSongs);
    localStorage.setItem('savedSongs', JSON.stringify(updatedSongs));
    onNext();
  };

  return (
    <div>
      <p>{song.title}</p>
      <p>{song.album}</p>
      <button onClick={handleSave}>Lägg till</button>
      <button onClick={onNext}>Inte den</button>
    </div>
  );
};

export default SongDisplay;