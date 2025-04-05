import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const Playercontext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      minutes: 0,
      seconds: 0,
    },
    totalTime: {
      minutes: 0,
      seconds: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = (id) => {
    const song = songsData.find((song) => song.id === id);
    if (song) {
      setTrack(song);
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0);
    }
  };

  const previous = () => {
    if (track.id > 0) {
      const prevTrack = songsData.find((song) => song.id === track.id - 1);
      setTrack(prevTrack);
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0);
    }
  };

  const next = () => {
    if (track.id < songsData.length - 1) {
      const nextTrack = songsData.find((song) => song.id === track.id + 1);
      setTrack(nextTrack);
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration )
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        setTime({
          currentTime: {
            minutes: Math.floor(audioRef.current.currentTime / 60),
            seconds: Math.floor(audioRef.current.currentTime % 60),
          },
          totalTime: {
            minutes: Math.floor(audioRef.current.duration / 60),
            seconds: Math.floor(audioRef.current.duration % 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <Playercontext.Provider value={contextValue}>
      {props.children}
    </Playercontext.Provider>
  );
};

export default PlayerContextProvider;
