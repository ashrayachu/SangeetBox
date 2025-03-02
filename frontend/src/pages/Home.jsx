
import FeaturedSongs from '../components/FeaturedSongs';
import TrendingPlaylist from '../components/TrendingPlaylist';


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingSongs, fetchTrendingPlaylists } from "../redux/slices/spotifySlice";


const Home = () => {
    const dispatch = useDispatch();
    const { trendingSongs, trendingPlaylists, status, error } = useSelector(
        (state) => state.spotify
    );

    // Fetch Songs & Playlists on Page Load
    useEffect(() => {
        dispatch(fetchTrendingSongs());
        dispatch(fetchTrendingPlaylists());
    }, [dispatch]);

    return (
        <div className="text-white bg-black p-1 md:p-10 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold mb-4">Trending Music</h1>
                {status === "loading" && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {trendingSongs?.length > 0 && (
                    <ul className="mt-2">
                        {trendingSongs
                            .filter((song) => song)
                            .map((song) => (
                                <li key={song.id} className="mb-2">
                                    <div className='flex items-center gap-1 w-full hover:bg-neutral-800 p-2 rounded-lg'>
                                        <div>
                                            <img src={song?.images?.[0]?.url} alt="album cover" className='w-12 h-12' />
                                        </div>
                                        <div>{song?.name}</div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <div className='relative z-10'>
                <TrendingPlaylist trendingPlaylists={trendingPlaylists} />
            </div>
        </div>

    );
};

export default Home;