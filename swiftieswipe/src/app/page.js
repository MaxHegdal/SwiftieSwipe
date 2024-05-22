'use client';

import { useState } from 'react';
import SongDisplay from './components/SongDisplay';

const songs = [
  { title: "Love Story", album: "Fearless" },
  { title: "You Belong With Me", album: "Fearless" },
  { title: "Shake It Off", album: "1989" },
  { title: "All Too Well", album: "Red" },
  { title: "Cruel Summer", album: "Lover" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
  };

  return (
    <main>
      <h1>SwiftieSwipe</h1>
      <div>
        <SongDisplay song={currentSong} onNext={handleNext} />
        <button onClick={() => window.location.href = '/list'}>Visa min lista</button>
      </div>
    </main>
  );
};

export default Home;
