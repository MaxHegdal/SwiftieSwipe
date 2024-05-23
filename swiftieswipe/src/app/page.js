"use client";
import { useState, useEffect } from "react";
import SongDisplay from "./components/SongDisplay";
import { fetchSongs } from "@/lib/api";
import Spinner from "./components/spinner";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const songs = await fetchSongs();
        setSongs(songs);
        console.log(songs);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <h1>SwiftieSwipe</h1>
      <div className="grid gap-6">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow-lg">
              <p className=" align-middle">{song.name}</p>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default Home;
