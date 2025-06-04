import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3001
const DATA_DIR = path.join(process.cwd(), 'data')

app.get('/albums', (req, res) => {
  const data = fs.readFileSync(path.join(DATA_DIR, 'albums.json'), 'utf-8')
  res.json(JSON.parse(data))
})

app.get('/songs', (req, res) => {
  const data = fs.readFileSync(path.join(DATA_DIR, 'songs.json'), 'utf-8')
  res.json(JSON.parse(data))
})

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`)
})
