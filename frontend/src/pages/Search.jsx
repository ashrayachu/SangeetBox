import React, { useState, useEffect } from 'react';
import { searchSongs } from "../redux/slices/searchSong";
import { playSong } from "../redux/slices/playSong";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";


const Search = () => {
    const dispatch = useDispatch();
    const { query } = useParams();
    const [tracks, setTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const { searchResults, status } = useSelector((state) => state.search);
    useEffect(() => {
        if (searchResults?.tracks) {
            setTracks(searchResults.tracks.items);
            setPlaylists(searchResults.playlists.items);

        }
    }, [searchResults]);
    console.log("tracks", tracks)

    useEffect(() => {
        if (query) {
            dispatch(searchSongs(query)).catch((error) => {
                alert("Error fetching search results:", error);
                console.error("Error fetching search results:", error);
            });
        }
    }, [dispatch, query]);


    const handlePlay = (songId, songUrl) => {
        console.log(songId, songUrl);
        dispatch(playSong({ songId, songUrl })).catch((error) => {
            alert("Error playing the song:");
            console.error("Error playing the song:", error);
        });
    };

    return (
        <div className='bg-black min-h-screen flex flex-col w-full'>
            {/* top results */}
            <div className='flex flex-col p-5 gap-4'>
                <h1 className='text-white text-2xl hover:underline decoration-white underline-offset-3'>Songs</h1>
                {status === "loading" && <div className='text-white'>Loading...</div>}
                <ul className='text-white flex flex-col gap-2 w-full'>
                    {tracks.length > 0 ? (
                        tracks.map((result, index) => (
                            <li key={index} className='w-full hover:cursor-pointer'
                                onClick={() => handlePlay(result.id, result.external_urls.spotify)}>
                                <div className="flex items-center gap-1 w-full hover:bg-neutral-800 p-2 rounded-lg">
                                    <div>
                                        <img src={result.album?.images?.[0]?.url} alt="album cover" className='w-12 h-12' />
                                    </div>
                                    <div>{result?.name}</div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className='text-white'>No tracks found</div>
                    )}
                </ul>
            </div>

            {/* Artists Section */}
            <div className='artist p-5'>
                {status === "loading" && <div className='text-white'>Loading...</div>}
                <h1 className='text-white text-2xl hover:underline decoration-white underline-offset-3 mb-4'>Playlists</h1>
                <ul className='text-white flex flex-col gap-2 w-full'>
                    {playlists.length > 0 ? (
                        playlists.map((result, index) => (

                            <li key={index} className={`${result ? "w-full" : "hidden"} hover:cursor-pointer`}>

                                <div className='flex items-center gap-2 w-full hover:bg-neutral-800 p-2 rounded-lg'>
                                    <div>
                                        <img src={result?.images?.[0]?.url || "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                            alt="album cover" className='w-12 h-12' />
                                    </div>
                                    <div>{result?.name || "Playlist name"}</div>
                                    <span className='px-4 py-1 flex justify-center items-center text-black text-sm rounded-full bg-white'>
                                        <Link to={`/playlist/${result?.id}`}>Play</Link>

                                    </span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className='text-white'>No tracks found</div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;
