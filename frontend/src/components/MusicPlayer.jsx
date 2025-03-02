import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, playSong, stopSong, toggleMaximize, nextSong } from "../redux/slices/playSong"; // Import actions
import Slider from '@mui/material/Slider';
import CircularProgress from '@mui/material/CircularProgress';
import { searchSongs } from "../redux/slices/searchSong";

import { useNavigate } from "react-router-dom";


import {
  Maximize2,
  Mic2,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  Pause,
  ArrowDownToLine
} from "lucide-react"

const MusicPlayer = () => {

  const { error } = useSelector((state) => state.playSong);
  const navigate = useNavigate();

  const playerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      navigate("/error", {
        state: {
          message: error, status: status
        }
      });
    }
  }, [error, navigate]);

  const [volume, setVolume] = useState(30);
  const [foundSong, setFoundSong] = useState(null);
  const [position, setPosition] = useState(0);
  const [playerDuration, setPlayerDuration] = useState(0);

  const { searchResults } = useSelector((state) => state.search);



  const currentSong = useSelector((state) => state.playSong?.currentSong);
  const status = useSelector((state) => state.playSong?.status);
  const maximize = useSelector((state) => state.playSong?.maximize);
  const currentIndex = useSelector((state) => state.playSong?.currentIndex);

  const playlistItems = useSelector((state) => state.playlist?.playlistItems);


  useEffect(() => {
    if (currentSong) {
      let song = null;
      // Find the song in search results
      if (searchResults.tracks?.items.length > 0) {
        song = searchResults.tracks.items.find((eachSong) => eachSong.id === currentSong.songId);
      }
      // Find the song in the playlist if not found in search results
      if (!song && playlistItems?.data?.items.length > 0) {
        song = playlistItems.data.items.find((eachSong) => eachSong.track.id === currentSong.songId);
      }
      setFoundSong(song); // ✅ Store in state
    }
  }, [currentSong, searchResults, playlistItems]);

  const image = foundSong?.album?.images?.[0]?.url
    || (foundSong?.track && foundSong.track.album?.images?.[0]?.url)
    || "";

  const title = foundSong?.name
    || (foundSong?.track && foundSong.track.name)
    || "Unknown Song";

  const artist = foundSong?.artists?.[0]?.name
    || (foundSong?.track && foundSong.track.artists?.[0]?.name)
    || "Unknown Artist";


  const handleToggleMaximize = () => { dispatch(toggleMaximize()); };

  const handlePlayPause = () => {
    dispatch(playPause());
  };

  const handleNextSong = () => {

    if (currentIndex < playlistItems?.data?.items.length - 1) {
      const songId = playlistItems?.data?.items[currentIndex + 1]?.track.id;
      const songUrl = playlistItems?.data?.items[currentIndex + 1]?.track.external_urls.spotify;
      console.log("songId in music player", songId);
      console.log("songUrl music player", songUrl);
      if (status != 'loading') {
        dispatch(nextSong());
        dispatch(playSong({ songId, songUrl })).catch((error) => {
          alert("Error playing the song:");
          console.error("Error playing the song:", error);

        });
      }

    }
  }
  const handleDownload = () => {
    if (!currentSong?.url) return;

    const link = document.createElement("a");
    link.href = currentSong.url;
    link.setAttribute("download", title || "song.mp3");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSeek = (_, value) => {
    setPosition(value);
    if (playerRef.current) {
      playerRef.current.seekTo(value, "minutes"); // ✅ Move playback position
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <>
      <div className={`border-t border-neutral-800 bg-black p-5  ${maximize ? "fixed top-0 left-0 h-screen w-full" : "min-h-[15vh] fixed bottom-0 left-0 w-full  "
        }`}
      >
        <div className={`${maximize ? "flex flex-col items-center justify-center gap-2 w-full" : "hidden"}`} >
          <div className="w-full md:h-[85vh] flex items-center justify-center">
            <img
              src={image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "}
              alt="Now Playing"
              className="w-full h-[75vh] object-contain"
            />
          </div>

          <div className={`${maximize ? "flex flex-col w-full h-[10vh] md:hidden" : "hidden"}`}>
            <div className="font-medium text-white">{title}</div>
            <div className="text-sm text-neutral-400">{artist}</div>
          </div>
        </div>

        <div className="flex md:grid grid-cols-3 items-center gap-4">
          <div className={`hidden md:flex items-center gap-4`}>
            <img
              src={image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "}
              alt="Now Playing"
              width={56}
              height={56}
              className="rounded"
            />
            <div>
              <div className="font-medium text-white">{title}</div>
              <div className="text-sm text-neutral-400">{artist}</div>
            </div>
          </div>
          <div className="flex w-full h-full flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <button>
                <Shuffle className="h-5 w-5 text-neutral-400" />
              </button>
              <button>
                <SkipBack className="h-5 w-5 text-neutral-400" />
              </button>
              <button className="bg-white rounded-full p-2" onClick={handlePlayPause}>
                {status === "loading" ? (
                  <CircularProgress className="text-sm  text-black" />
                ) : status === "playing" ? (
                  <Pause className="h-5 w-5 text-black" fill="black" />
                ) : (
                  <Play className="h-5 w-5 text-black" fill="black" />
                )}
              </button>

              <button onClick={handleNextSong} >
                <SkipForward className="h-5 w-5 text-neutral-400" />
              </button>
              <button>
                <Repeat className="h-5 w-5 text-neutral-400" />
              </button>
            </div>
            <div className="w-full flex gap-3 items-center">
              <div className="text-xs text-neutral-400">{formatTime(position)}</div>
              <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={playerDuration}
                onChange={handleSeek}
                sx={(t) => ({
                  color: 'white',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                      ...t.applyStyles('dark', {
                        boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                      }),
                    },
                    '&.Mui-active': {
                      width: 20,
                      height: 20,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.28,
                  },
                  ...t.applyStyles('dark', {
                    color: '#fff',
                  }),
                })}
              />
              <div className="text-xs text-neutral-400">{formatTime(playerDuration)}</div>
              <Maximize2 className="md:hidden flex h-5 w-5 text-neutral-400 hover:text-white" onClick={handleToggleMaximize} />

            </div>
          </div>
          <div className={`hidden md:flex w-full justify-center items-center gap-4`}>
            <Mic2 className="h-5 w-5 text-neutral-400 hover:text-white" />
            <ArrowDownToLine className="h-5 w-5 text-neutral-400 hover:text-white" onClick={handleDownload} />
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-neutral-400" />

              <Slider
                aria-label="Volume"
                value={volume}
                onChange={(e, newValue) => setVolume(newValue)}
                sx={(t) => ({
                  color: 'white',
                  width: 150,
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 14,
                    height: 14,
                    backgroundColor: '#fff',
                    '&::before': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: 'none',
                    },
                  },
                  ...t.applyStyles('dark', {
                    color: '#fff',
                  }),
                })}
              />
            </div>
            <Maximize2 className="h-5 w-5 text-neutral-400 hover:text-white" onClick={handleToggleMaximize} />
          </div>
        </div>
      </div>

      {/* ReactPlayer stays mounted */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={currentSong?.url || ""}
          playing={status === "playing"} // Redux controls playing
          controls={true}
          width="0"
          height="0"
          volume={volume / 100}
          onProgress={({ playedSeconds }) => setPosition(playedSeconds)}
          onDuration={(duration) => setPlayerDuration(duration)}

        />
      </div>
    </>

  );
};

export default MusicPlayer;
