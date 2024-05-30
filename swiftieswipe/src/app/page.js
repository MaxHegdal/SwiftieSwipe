"use client";
import { useState, useEffect } from "react";
import { fetchSongsWithAlbums } from "../lib/api";
import HamburgerMenu from "./components/HamburgerMenu";
import Spinner from "./components/TaylorSpinner";
import SongDisplay from "./components/SongDisplay";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [dislikedSongs, setDislikedSongs] = useState(() => {
    const savedDislikedSongs = localStorage.getItem("dislikedSongs");
    return savedDislikedSongs ? JSON.parse(savedDislikedSongs) : [];
  });
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentSongIndex");
    return savedIndex ? JSON.parse(savedIndex) : 0;
  });

  const [likedSongs, setLikedSongs] = useState(() => {
    const savedSongs = localStorage.getItem("likedSongs");
    return savedSongs ? JSON.parse(savedSongs) : [];
  });

  useEffect(() => {
  async function loadSongs() {
    try {
      let songs = await fetchSongsWithAlbums();
      songs = songs.filter(
        (song) => !likedSongs.includes(song) && !dislikedSongs.includes(song)
      );
      setSongs(songs);
    } catch (err) {
      setError(err.message);
    }
  }
    loadSongs();
  }, [likedSongs, dislikedSongs]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem("dislikedSongs", JSON.stringify(dislikedSongs));
  }, [dislikedSongs]);

  useEffect(() => {
    localStorage.setItem("currentSongIndex", JSON.stringify(currentSongIndex));
  }, [currentSongIndex]);

  const handleLike = () => {
    setLikedSongs([...likedSongs, songs[currentSongIndex]]);
    handleNext();
  };

  const handleDislike = () => {
    setDislikedSongs([...dislikedSongs, songs[currentSongIndex]]);
    handleNext();
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      alert("Nu var det slut på låtar");
    }
  };

  const removeSong = (index) => {
    const updatedLikes = likedSongs.filter((_, i) => i !== index);
    setLikedSongs(updatedLikes);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-gradient text-4xl opacity-100 font-medium mb-6 m-5">SwiftieSwipe</h1>
      <div>
        {songs.length > 0 ? (
          <>
            <SongDisplay
              song={songs[(currentSongIndex + 1) % songs.length]}
              onNext={handleNext}
            />
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="absolute top-0 left-0">
                <HamburgerMenu likedSongs={likedSongs} removeSong={removeSong} />
              </div>
              <div className="w-full max-w-sm">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <img
                    src={songs[currentSongIndex].albumCover}
                    alt={songs[currentSongIndex].title}
                    className="w-full h-64 object-cover mb-4 rounded-lg"
                  />
                  <h1 className="text-2xl font-bold mb-2">
                    {songs[currentSongIndex].title}
                  </h1>
                  <p className="text-black-700">{songs[currentSongIndex].name}</p>
                  <p className="text-gray-700">{songs[currentSongIndex].album}</p>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleDislike}
                    className="bg-red-500 text-white rounded-full p-4 shadow-md hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleLike}
                    className="bg-green-500 text-white rounded-full p-4 shadow-md hover:bg-green-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className=" flex">
                  <p className="text-gray-700 m-2">
                    {songs[currentSongIndex].lyrics}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
}
