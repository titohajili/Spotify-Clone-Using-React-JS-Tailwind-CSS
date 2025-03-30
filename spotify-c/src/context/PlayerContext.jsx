import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const Playercontext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playsStatus,setPlayStatus] = useState(false);
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

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playsStatus, setPlayStatus,
        time, setTime
    }

    return (
        <Playercontext.Provider value={contextValue}>
            {props.children}
        </Playercontext.Provider>
    )

}

export default PlayerContextProvider;