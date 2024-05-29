"use client";

import { useState, useEffect } from "react";
import SongDisplay from "./components/SongDisplay";
import SongList from "./list";
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

    const storedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];
    setSavedSongs(storedSongs);
  }, []);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
  };

  return (
    <main>
      <h1>SwiftieSwipe</h1>
      <div>
        {currentSong && (
          <SongDisplay
            song={currentSong}
            onNext={handleNext}
            savedSongs={savedSongs}
            setSavedSongs={setSavedSongs}
          />
        )}
        <SongList savedSongs={savedSongs} setSavedSongs={setSavedSongs} />
      </div>
    </main>
  );
};

export default Home;