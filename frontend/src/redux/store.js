import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSong";  // Adjust the path as needed
import playReducer from "./slices/playSong";
import playlistReducer from "./slices/getPlaylist";
import spotifyReducer from "./slices/spotifySlice";



const store = configureStore({
  reducer: {
    search: searchReducer,
    playSong: playReducer,
    playlist: playlistReducer,
    spotify: spotifyReducer,

  },
});

export default store;
