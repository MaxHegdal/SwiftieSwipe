"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Remove from "../images/remove.png";
import Heart from "../images/heart.png";

import { Button } from "@/components/ui/button";

import { useState } from "react";

const SongDisplay = ({ song, onNext }) => {
  const [savedSongs, setSavedSongs] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("savedSongs")) || [];
    }
    return [];
  });

  const handleSave = () => {
    const updatedSongs = [...savedSongs, song];
    setSavedSongs(updatedSongs);
    localStorage.setItem("savedSongs", JSON.stringify(updatedSongs));
    onNext();
  };

  return (
    <div>
      <Card className="bg-transparent border-none">
        <CardHeader>
        <CardTitle className="text-white">Lyssna på</CardTitle>
        <CardDescription>It's a Love Story baby just say yes...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:">
            <div>
              <p className="text-2xl text-gray-100">{song.title}</p>
              <p className="text-gray-100">{song.album}</p>
            </div>
            <Button
              className="bg-neutral-700 bg-opacity-50 rounded-full w-24 h-24 m-5
              md:w-52 md:justify-start md:m-3"
              onClick={handleSave}>
              <img className="md:h-16" src={Heart.src} alt="Lägg Till" />
            </Button>
            <Button className="bg-neutral-700 bg-opacity-50 rounded-full w-24 h-24 md:w-52 md:justify-start" onClick={onNext}>
              <img className="md:h-16 md:justify-start md:m-3" src={Remove.src} alt="Ta Bort" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongDisplay;
