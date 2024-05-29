// lib/api.js
export const fetchSongs = async () => {
  const response = await fetch("https://taylor-swift-api.vercel.app/api/songs");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const songs = await response.json();
  return songs;
};

export const fetchAlbums = async () => {
  const response = await fetch(
    "https://taylor-swift-api.vercel.app/api/albums"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const albums = await response.json();
  return albums;
};

export const fetchSongsWithAlbums = async () => {
  const songs = await fetchSongs();
  const albums = await fetchAlbums();

  const albumMap = albums.reduce((map, album) => {
    map[album.title] = album.albumCover; 
    return map;
  }, {});

  return songs.map((song) => ({
    ...song,
    albumCover: albumMap[song.album] || "", 
  }));
};
