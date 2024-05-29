"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const SongList = ({ savedSongs, setSavedSongs }) => {
  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("savedSongs")) || [];
    if (storedSongs.length > 0) {
      setSavedSongs(storedSongs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedSongs", JSON.stringify(savedSongs));
  }, [savedSongs]);

  const clearLocalStorage = () => {
    localStorage.removeItem("savedSongs");
    setSavedSongs([]);
  };

  const removeSong = (index) => {
    const updatedSongs = savedSongs.filter((_, i) => i !== index);
    setSavedSongs(updatedSongs);
  };

  return (
    <div>
      <h2>Sparade låtar</h2>
      {savedSongs.length > 0 ? (
        <ul>
          {savedSongs.map((song, index) => (
            <li key={index}>
              {`${song.name} - ${song.album}`}
              <Button onClick={() => removeSong(index)}>Ta bort</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga låtar i listan</p>
      )}
      <Button onClick={clearLocalStorage}>Rensa lista</Button>
    </div>
  );
};

export default SongList;
