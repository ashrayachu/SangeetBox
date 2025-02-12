import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSong";  // Adjust the path as needed
import playReducer from "./slices/playSong";

const store = configureStore({
  reducer: {
    search: searchReducer,
    playSong: playReducer,

  },
});

export default store;
