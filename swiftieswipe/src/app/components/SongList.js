"use client";
import { useState, useEffect } from "react";

const SongList = () => {
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];
    setSavedSongs(storedSongs);
  }, []);

  useEffect(() => {
    if (savedSongs.length > 0) {
      localStorage.setItem("savedSongs", JSON.stringify(savedSongs));
    }
  }, [savedSongs]);

  const clearLocalStorage = () => {
    localStorage.removeItem("savedSongs");
    setSavedSongs([]);
  };

  return (
    <div>
      <h2>Sparade låtar</h2>
      {savedSongs.length > 0 ? (
        <ul>
          {savedSongs.map((song, index) => (
            <li key={index}>{`${song.title} - ${song.album}`}</li>
          ))}
        </ul>
      ) : (
        <p>Inga låtar i listan</p>
      )}
      <button onClick={clearLocalStorage}>Rensa lista</button>
    </div>
  );
};

export default SongList;