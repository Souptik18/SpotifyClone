/* eslint-env node */
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const albumsData = JSON.parse(fs.readFileSync('./data/albums.json'));
const songsData = JSON.parse(fs.readFileSync('./data/songs.json'));

const app = express();
app.use(cors());

app.get('/api/albums', (req, res) => res.json(albumsData));
app.get('/api/albums/:id', (req, res) => {
  const album = albumsData.find(a => a.id === Number(req.params.id));
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.json(album);
});
app.get('/api/songs', (req, res) => res.json(songsData));
app.get('/api/songs/:id', (req, res) => {
  const song = songsData.find(s => s.id === Number(req.params.id));
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mock server running on port ${PORT}`));

