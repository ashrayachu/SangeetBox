import React, { useState, useEffect } from 'react';
import { searchSongs } from "../redux/slices/searchSong";
import { playSong } from "../redux/slices/playSong";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Search = () => {
    const dispatch = useDispatch();
    const { query } = useParams();
    const { searchResults, status } = useSelector((state) => state.search);

    useEffect(() => {
        if (query) {
            dispatch(searchSongs(query)).catch((error) => {
                alert("Error fetching search results:", error);
                console.error("Error fetching search results:", error);
            });
        }
    }, [dispatch, query]);


    const handlePlay = (songId, songUrl) => {
         console.log(songId, songUrl)
        dispatch(playSong({songId, songUrl})).catch((error) => {
            alert("Error playing the song results:");
            console.error("Error fetching search results:", error);
        });


    }



    // useEffect(() => {if(status ==="suceeded"){
    //     console.log(searchResults)
    // } }, [status]);



    return (
        <div className='bg-black min-h-screen flex flex-col w-full' >
            {/* top results */}
            <div className=' flex flex-col p-5 gap-4'>
                <h1 className='text-white text-2xl hover:underline decoration-white underline-offset-3'> Songs</h1>
                {status === "loading" && <div className='text-white'>Loading...</div>}
                <ul className='text-white flex flex-col gap-2 w-full'>
                    {searchResults.map((result, index) => (
                        <li key={index} className='w-full hover:cursor-pointer'
                            onClick={() => handlePlay(result.id, result.external_urls.spotify)} >
                            <div className='flex items-center gap-1 w-full hover:bg-neutral-800  p-2 rounded-lg'>
                                <div>
                                    <img src={result.album.images[0].url} alt="album cover" className='w-12 h-12 ' />
                                </div>
                                <div className=''>
                                    {result.name}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='artist p-5'>
                {status === "loading" && <div className='text-white'>Loading...</div>}
                <h1 className='text-white text-2xl hover:underline decoration-white underline-offset-3'>Artists</h1>
            </div>


            {/* <ul className='text-white flex flex-col gap-2'>
                {searchResults.map((result, index) => (
                    <li key={index} className='' >
                        <div className='bg-neutral-800 p-4 rounded-lg hover:'>
                            {result.name}
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Search;