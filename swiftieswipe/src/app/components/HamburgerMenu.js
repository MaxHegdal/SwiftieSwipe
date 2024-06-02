import { useState } from "react";
import { motion } from "framer-motion";
import Playlist from "../images/playlist.png";

const menuVariants = {
  open: {
    opacity: 1,
    x: 0,
    overflowY: "scroll",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const HamburgerMenu = ({ likedSongs, removeSong, clearAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-black focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <img
          src={Playlist.src}
          alt="playlist icon"
          className="h-10 opacity-80"
        />
      </button>

      <motion.div
        className="fixed top-0 left-0 w-3/4 sm:w-1/3 h-full bg-gray-800 shadow-lg z-50"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="bg-gray-800 h-full">
          <button
            className="m-5 text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
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
            className="absolute top-0 right-0 m-5 text-gray-300 focus:outline-none"
            onClick={clearAll}
          >
            Radera Allt
          </button>
          <nav className="flex flex-col items-start p-8 top-3">
            {likedSongs.length === 0 ? (
              <p className=" ">Du har inga gillade låtar.</p>
            ) : (
              likedSongs.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center mb-6 w-full scroll-m-0"
                >
                  <img
                    src={song.albumCover}
                    alt={song.album}
                    className="w-12 h-12 object-cover rounded-lg mr-4"
                  />
                  <span className="flex-1 text-lg text-slate-50">
                    {song.name}
                  </span>
                  <button
                    onClick={() => removeSong(index)}
                    className="bg-rose-600 text-white rounded-full p-2 shadow-md hover:bg-rose-800 focus:outline-none"
                    aria-label="Remove Song"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ffffff"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </nav>
        </div>
      </motion.div>
    </div>
  );
};

export default HamburgerMenu;
