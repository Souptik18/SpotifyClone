import { createContext, useEffect, useRef, useState } from "react";
import songsData from "../api/songs.json";
import { assets } from "../assets/assets";

const songs = songsData.map(item => ({
    ...item,
    image: assets[item.image],
    file: assets[item.file]
}));

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const [track, setTrack] = useState(songs[0]);
    const [playStatus, setPlayStatus] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = 0.1;
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const toggleShuffle = () => {
        setIsShuffling(prev => !prev);
    }

    const toggleLoop = () => {
        setIsLooping(prev => {
            const newState = !prev;
            if (audioRef.current) {
                audioRef.current.loop = newState;
            }
            return newState;
        });
    }

    const previous = async () => {
        if (track.id > 0) {
            if (import.meta.env.DEV) console.log("prev", track.id);
            await setTrack(songs[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if (track.id < songs.length - 1) {
            if (import.meta.env.DEV) console.log("next", track.id);
            await setTrack(songs[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const playWithId = async (id) => {
        await setTrack(songs[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    function seekSong(e) {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }

    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;

    const handleTimeUpdate = () => {
            if (!Number.isFinite(audioEl.duration)) return;
            seekBar.current.style.width = (Math.floor(audioEl.currentTime * 100 / audioEl.duration)) + "%";
            setTime({
                currentTime: {
                    second: Math.floor(audioEl.currentTime % 60),
                    minute: Math.floor(audioEl.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(audioEl.duration % 60),
                    minute: Math.floor(audioEl.duration / 60)
                }
            })
        };

        const timeoutId = setTimeout(() => {
            audioEl.ontimeupdate = handleTimeUpdate;
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            audioEl.ontimeupdate = null;
        };
    }, [])

    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        setTime({
            currentTime: { second: 0, minute: 0 },
            totalTime: { second: 0, minute: 0 }
        });
        const handleMetadata = () => {
            setTime(prev => ({
                ...prev,
                totalTime: {
                    second: Math.floor(audioEl.duration % 60),
                    minute: Math.floor(audioEl.duration / 60)
                }
            }));
        };
        audioEl.addEventListener('loadedmetadata', handleMetadata);
        return () => audioEl.removeEventListener('loadedmetadata', handleMetadata);
    }, [track])

    const contextValue = {
        audioRef,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        next,
        previous,
        play,
        pause,
        playWithId,
        seekBar,
        seekBg,
        seekSong,
        time,
        isShuffling,
        isLooping,
        toggleShuffle,
        toggleLoop
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;
