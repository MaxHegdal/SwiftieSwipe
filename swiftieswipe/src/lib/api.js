export async function fetchSongs() {
  const response = await fetch("https://taylor-swift-api.vercel.app");
  return response.json();
}

