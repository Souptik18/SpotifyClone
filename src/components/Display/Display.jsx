import { useEffect, useRef, useState } from 'react';
import DisplayHome from '../DisplayHome/DisplayHome';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayAlbum from '../DisplayAlbum/DisplayAlbum';
import { fetchAlbums } from '../../utils/api';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums().then(setAlbums);
  }, []);

  useEffect(() => {
    const isAlbum = location.pathname.includes('album');
    const id = isAlbum ? Number(location.pathname.split('/').pop()) : null;
    const album = albums.find(a => a.id === id);
    const color = album ? album.bgColor : '#121212';

    if (!displayRef.current) return;
    if (isAlbum && album) {
      displayRef.current.style.background = `linear-gradient(${color},#121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  }, [location, albums]);

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;

