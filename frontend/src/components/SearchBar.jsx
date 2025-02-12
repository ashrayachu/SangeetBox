import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongs } from "../redux/slices/searchSong";  // Adjust path as needed

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { searchResults, status, error } = useSelector((state) => state.search);

  const handleSearch = () => {
    dispatch(searchSongs(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs"
      />
      <button onClick={handleSearch}>Search</button>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {status === "succeeded" && (
        <ul>
          {searchResults.map((song) => (
            <li key={song.id}>{song.name}</li>  // Adjust based on the song object structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
