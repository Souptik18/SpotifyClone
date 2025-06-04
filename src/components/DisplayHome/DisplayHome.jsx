import { useEffect, useState } from 'react'
import AlbumItem from '../AlbumItem/AlbumItem'
import SongItem from '../SongItem/SongItem'
import DisplayNav from '../DisplayNav/DisplayNav'
import { fetchAlbums, fetchSongs } from '../../utils/api'
import { withAssets } from '../../utils/assetHelper'

const DisplayHome = () => {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchAlbums().then(data => setAlbums(withAssets(data)));
        fetchSongs().then(data => setSongs(withAssets(data)));
    }, []);

    return (
        <>
            <DisplayNav />
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='flex overflow-auto'>
                    {albums.map((item, index) => (
                        <AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />
                    ))}
                </div>
            </div>
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Today&apos;s biggest hits</h1>
                <div className='flex overflow-auto'>
                    {songs.map((item, index) => (
                        <SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayHome

