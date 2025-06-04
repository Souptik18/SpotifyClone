const BASE_URL = '/api';

export async function fetchAlbums() {
  const res = await fetch(`${BASE_URL}/albums`);
  if (!res.ok) throw new Error('Failed to load albums');
  return res.json();
}

export async function fetchSongs() {
  const res = await fetch(`${BASE_URL}/songs`);
  if (!res.ok) throw new Error('Failed to load songs');
  return res.json();
}

export async function fetchSong(id) {
  const res = await fetch(`${BASE_URL}/songs/${id}`);
  if (!res.ok) throw new Error('Song not found');
  return res.json();
}
