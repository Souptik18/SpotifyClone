import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { PlayerContext } from '../../context/PlayerContext'

const Player = () => {

    const { track, playStatus, play, pause, previous, next, seekBar, seekBg, seekSong, time, volume, setVolume } = useContext(PlayerContext);

    const handlePlays = () => console.log('plays icon');
    const handleMic = () => console.log('mic icon');
    const handleQueue = () => console.log('queue icon');

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden items-center gap-4 lg:flex'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                    <img className='w-4 cursor-pointer' onClick={previous} src={assets.prev_icon} alt="" />
                    {playStatus
                        ? <img className='w-4 cursor-pointer' onClick={pause} src={assets.pause_icon} alt="" />
                        : <img className='w-4 cursor-pointer' onClick={play} src={assets.play_icon} alt="" />
                    }
                    <img className='w-4 cursor-pointer' onClick={next} src={assets.next_icon} alt="" />
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div onClick={seekSong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden items-center gap-2 opacity-75 lg:flex'>
                <img className='w-4 cursor-pointer' onClick={handlePlays} src={assets.plays_icon} alt='' />
                <img className='w-4 cursor-pointer' onClick={handleMic} src={assets.mic_icon} alt='' />
                <img className='w-4 cursor-pointer' onClick={handleQueue} src={assets.queue_icon} alt='' />
                <img className='w-4' src={assets.speaker_icon} alt="" />
                <img className='w-4' src={assets.volume_icon} alt="" />
                <input
                    className='w-20'
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
                <img className='w-4' src={assets.mini_player_icon} alt="" />
                <img className='w-4' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    )
}

export default Player