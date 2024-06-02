"use client";
import { useState, useEffect } from "react";
import { fetchSongsWithAlbums } from "../lib/api";
import HamburgerMenu from "./components/HamburgerMenu";
import Spinner from "./components/TaylorSpinner";
import Heart from "./images/heart.png";
import Delete from "./images/remove.png";
import { motion } from "framer-motion";

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
    localStorage.setItem("dislikedSongs", JSON.stringify(dislikedSongs));
    localStorage.setItem("currentSongIndex", JSON.stringify(currentSongIndex));
  }, [likedSongs, dislikedSongs, currentSongIndex]);

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

  const clearAll = () => {
    setLikedSongs([]);
    setDislikedSongs([]);
    setCurrentSongIndex(0);
    localStorage.removeItem("likedSongs");
    localStorage.removeItem("dislikedSongs");
    localStorage.removeItem("currentSongIndex");
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
      <h1
        className="bg-gradient-to-b from-gray-50 via-gray-200 to-gray-800 inline-block opacity-70 text-transparent bg-clip-text
      text-5xl font-medium m-10 ml-28"
      >
        SwiftieSwipe
      </h1>
      <div>
        {songs.length > 0 ? (
          <>
            <div className="flex flex-col items-center justify-center lg:w-full">
              <div className="absolute top-10 left-12">
                <HamburgerMenu
                  likedSongs={likedSongs}
                  removeSong={removeSong}
                  clearAll={clearAll}
                />
              </div>
              <div className="w-full max-w-full lg:max-h-screen lg:grid lg:grid-cols-3 lg:gap-4">
                <motion.div
                  className="backdrop-blur bg-white/10 m-5 p-6 rounded-lg shadow-xl text-center bg-blend-overlay lg:col-span-2 flex-column"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center">
                    <img
                      src={songs[currentSongIndex].albumCover}
                      alt={songs[currentSongIndex].title}
                      className="mb-4 rounded-lg object-cover min-h-2 flex align-middle"
                      style={{ height: "300px", width: "300px" }}
                    />
                  </div>
                  <p className="text-white-900 font-bold">
                    {songs[currentSongIndex].name}
                  </p>
                  <p className="text-white-600">
                    {songs[currentSongIndex].album}
                  </p>
                </motion.div>
                <div className="flex justify-evenly mt-6 lg:flex-col lg:justify-around lg:col-start-3">
                  <motion.button
                    onClick={() => {
                      handleDislike();
                      handleNext();
                    }}
                    className="backdrop-blur bg-white/10 rounded-full p-4 shadow-md  md:opacity-60 hover:opacity-100
                    flex justify-center items-center h-40 w-40 md:w-11/12 md:justify-around"
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={Delete.src}
                      alt="delete-icon"
                      className="h-5/6 opacity-75 md:h-4/6"
                    />
                    <span className="max-md:hidden text-3xl">
                      You're losing me
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      handleLike();
                      handleNext();
                    }}
                    className="backdrop-blur bg-white/10 rounded-full p-4 shadow-md md:opacity-60 hover:opacity-100
                    flex justify-center items-center h-40 w-40 md:w-11/12 md:justify-around"
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={Heart.src}
                      alt="heart-icon"
                      className="h-5/6 opacity-75 md:h-4/6"
                    />
                    <span className="max-md:hidden text-3xl ">
                      You belong with me
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex align-middle justify-center m-auto h-auto ">
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
}
