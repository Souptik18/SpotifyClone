# React Tailwind CSS Project

## Introduction

This project is built using React and Tailwind CSS to create a responsive and modern user interface.



<img width="947" alt="image" src="https://github.com/Souptik18/SpotifyClone/assets/62500243/642bb67a-9dc7-4e93-b6ac-940e8b1b41c1">

<img width="949" alt="image" src="https://github.com/Souptik18/SpotifyClone/assets/62500243/e533f598-60bd-4443-8883-79a7842bc647">

## Getting Started

### Prerequisites

- Node.js **18+**

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

In another terminal, start the mock API server:

```bash
npm run server
```

`server.js` reads data from the `data/` directory and exposes album and song endpoints.

### Production Build

```bash
npm run build
```

## Project Structure

- `src/` – React components, context and assets
- `public/` – static files served directly
- `index.html` – main HTML entry point
- `data/` – JSON files served by `server.js`
- `server.js` – mock API for album and song data
- Configuration – `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
