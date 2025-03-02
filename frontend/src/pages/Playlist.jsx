import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylist } from "../redux/slices/getPlaylist";
import { playSong, setCurrentIndex } from "../redux/slices/playSong";

import CircularProgress from "@mui/material/CircularProgress";

const Playlist = () => {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [foundplaylist, setFoundPlaylist] = useState([]);

    const { playlistItems, playlistStatus } = useSelector((state) => state.playlist);
    const searchResults = useSelector((state) => state.search.searchResults);
    const trendingPlaylists = useSelector((state) => state.spotify.trendingPlaylists);
    const status = useSelector((state) => state.playSong?.status);


    useEffect(() => {
        if (playlistId) {
            let foundplaylist = null;
            dispatch(getPlaylist(playlistId));
            if (trendingPlaylists.length > 0) {
                foundplaylist = trendingPlaylists.find((playlist) => playlist?.id === playlistId);
            }
            if (searchResults.playlists?.items?.length > 0) {
                foundplaylist = searchResults.playlists.items.find((playlist) => playlist?.id === playlistId);
            }
            if (foundplaylist) {
                setFoundPlaylist(foundplaylist);
            }

        }
    }, [playlistId]);
    console.log("foundplaylist", foundplaylist);
    const image = foundplaylist?.images?.[0]?.url;


    const title = foundplaylist?.name || "Unknown Playlist";
    const description = foundplaylist?.description || "No description available";


    const handlePlay = (songId, songUrl, index) => {
        if (status != 'loading') {
            dispatch(setCurrentIndex(index));
            dispatch(playSong({ songId, songUrl })).catch((error) => {
                alert("Error playing the song:");
                console.error("Error playing the song:", error);
            });
        }

    };



    return (
        <div className="w-full gap-10 min-h-screen bg-black">
            <div className="w-full bg-cyan-950 flex md:flex p-2 md:p-10 md:gap-10 ">
                <div className="mb-2">
                    <img
                        src={image ?? "https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"}
                        className="w-60 h-60 object-cover rounded-md bg-white shadow-2xl"
                        alt="playlist image"
                    />
                </div>
                <div className="flex md:flex-col justify-end gap-2 md:gap-5 ">
                    <div className="flex w-1/2 md:w-full flex-col gap-2 justify-self-start">
                        <p className="text-3xl hidden md:flex md:text-8xl text-amber-100 font-bold ">Playlist</p>
                        <p className="text-xl md:text-3xl text-amber-100 font-normal">{title}</p>
                        <p className="text-xl md:text-3xl text-amber-100 font-normal">{description}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">{playlistItems?.count ?? "50"} songs</p>
                        <span className="text-amber-100 hover:cursor-pointer"
                            onClick={() => handlePlay(playlistItems.data.items[0]?.track.id, playlistItems.data.items[0]?.track.external_urls.spotify)}>
                            play
                        </span>
                    </div>

                </div>
            </div>

            <div className="text-white p-2 md:p-10">
                {playlistStatus === "loading" || !playlistItems?.data ? (
                    <CircularProgress className="text-white" />
                ) : playlistItems.data.items?.length > 0 ? (
                    <ul>
                        {playlistItems.data.items.map((result, index) => (
                            <li key={index}
                                onClick={() => handlePlay(result.track.id, result.track.external_urls.spotify, index)} >
                                <div className={`flex items-center gap-2 w-full hover:bg-neutral-800 cursor-pointer p-2 rounded-lg ${status === "playing"}?"bg-green-100":""}`}>
                                    <div>
                                        <img src={result.track.album?.images?.[0]?.url} alt="album cover" className='w-12 h-12' />
                                    </div>
                                    <div>{result.track.name}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Show message when no playlist items exist
                    <div className="text-gray-400 text-center mt-4">{playlistItems.data?.message || "could not find songs from playlist"}</div>
                )}
            </div>
        </div>
    );
};

export default Playlist;
