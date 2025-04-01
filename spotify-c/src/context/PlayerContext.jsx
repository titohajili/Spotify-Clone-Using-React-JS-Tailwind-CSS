import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const Playercontext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus,setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime:{
            minutes: 0,
            seconds: 0
        },
        totalTime:{
            minutes: 0,
            seconds: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    useEffect(()=>{
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                setTime({currentTime:{
                    minutes: Math.floor(audioRef.current.currentTime / 60),
                    seconds: Math.floor(audioRef.current.currentTime % 60),
                },
                totalTime:{
                    minutes: Math.floor(audioRef.current.duration / 60),
                    seconds: Math.floor(audioRef.current.duration % 60),
                }})
            }
        }, 1000);
    },[audioRef])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,

    }

    return (
        <Playercontext.Provider value={contextValue}>
            {props.children}
        </Playercontext.Provider>
    )

}

export default PlayerContextProvider;