"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useState } from "react";

const SongDisplay = ({ song, onNext, savedSongs, setSavedSongs }) => {
  const handleSave = () => {
    const updatedSongs = [...savedSongs, song];
    setSavedSongs(updatedSongs);
    localStorage.setItem("savedSongs", JSON.stringify(updatedSongs));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Lyssna på</CardTitle>
          <CardDescription>Är det en hit eller miss?</CardDescription>
        </CardHeader>
        <CardContent>
          <div>

            <p className="">{song.name}</p>
            <p>{song.album}</p>
            <Button
              className=" m-5 bg-yellow-200 hover:bg-lime-400 text-stone-950 w-40 h-10 rounded-md"
              onClick={handleSave}
            >
              Lägg till
            </Button>
            <Button onClick={onNext}>Inte den</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongDisplay;
