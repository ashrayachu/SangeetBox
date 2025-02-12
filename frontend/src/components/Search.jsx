import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { toast } from "react-toastify";

import SearchBar from "./SearchBar";

function Search({ setSongId }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [loadingSongId, setLoadingSongId] = useState(null); 
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = async () => {
    if (!query) {
      toast.error("Please enter a search term!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { query },
      });
      setResults(response.data);
    } catch (error) {
      toast.error("Error searching songs. Try again later.");
    }
  };

  const handlePlaySong = async (songUrl, songId) => {
    if (songId === currentSongId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentSongId(null);
      }
      return;
    }

    setLoadingSongId(songId);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:5000/api/play`, {
        songUrl,
        songId,
      });

      

      const mediaUrl = response.data.url;
      console.log("mediaUrl", mediaUrl);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      setCurrentSongId(songId);
      setLoadingSongId(null);

      const newAudio = new Audio(mediaUrl);
      audioRef.current = newAudio;
      audioRef.current.play();
    } catch (error) {
      setLoadingSongId(null);
      console.log(error);
      toast.error("Error playing song. Try again later.");
    }
  };

  const handleNavigateToKaraoke = async (songId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/play`, {
        songId,
      });

      const parsedData = JSON.parse(response.data.data);
      const mediaUrl = parsedData.data.medias[0].url;


      // ✅ Pass media URL in state
    } catch (error) {
      toast.error("Error fetching song URL.");
    }
  };

  return (
    <div className="mb-8 p-4 bg-white shadow-md rounded-lg">

      {/* <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-3 mt-4 rounded shadow-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>

      <ul className="mt-6 space-y-2">
        {results.map((song) => (
          <li
            key={song.id}
            className={`p-3 border rounded cursor-pointer hover:bg-gray-100 shadow-sm ${currentSongId === song.id ? "bg-blue-100" : ""
              }`}
          >
            {loadingSongId === song.id ? (
              <span className="text-blue-500">Loading...</span>
            ) : (
              <span
                onClick={() => handlePlaySong(song.external_urls.spotify, song.id)}
                className="bg-green-400 px-10 py-2 cursor-pointer"
              >
                Play
              </span>
            )}
            {song.name} - {song.artists[0].name}
            <button
              onClick={() => handleNavigateToKaraoke(song.external_urls.spotify, song.id)}
              className="ml-4 bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600"
            >
              Karaoke
            </button>
          

          </li>
        ))}
      </ul>

      {error && <p className="text-red-500 mt-4">{error}</p>} */}
      <SearchBar />
    </div>
  );
}

export default Search;
