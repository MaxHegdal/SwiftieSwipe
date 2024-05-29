"use client";

import { useState, useEffect } from "react";
import SongDisplay from "./components/SongDisplay";
import SongList from "./components/SongList";
import { fetchSongs } from "@/lib/api";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
        setCurrentSong(fetchedSongs[0]);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    getSongs();

    if (savedSongs.length === 0) {
      const storedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];
      setSavedSongs(storedSongs);
    }
  }, []);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
  };

  const handleSave = (song) => {
    const updatedSongs = [...savedSongs, song];
    setSavedSongs(updatedSongs);
    localStorage.setItem("savedSongs", JSON.stringify(updatedSongs));
    handleNext(); 
  };

  return (
    <main>
      <h1>SwiftieSwipe</h1>
      <div>
        {currentSong && (
          <SongDisplay
            song={currentSong}
            onNext={handleNext}
            onSave={handleSave}
          />
        )}
        <SongList savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
      </div>
    </main>
  );
};

export default Home;
