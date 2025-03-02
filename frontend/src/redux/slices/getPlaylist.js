import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;


// 🎵 Async function to play a song (API call)
export const getPlaylist = createAsyncThunk(
  "/playlist",
  async (playlistId, { rejectWithValue }) => {
   
    try {
      console.log("Sending request:", {playlistId});
      const response = await axios.get(`${API_URL}/api/playlist`, {
        params: { playlistId: encodeURIComponent(playlistId) }
    });
    return response.data;
    } catch (error) {
     
    //   toast.error("Error retrieving playlist song. Try again later.");
    console.log("Error retrieving playlist")
      return rejectWithValue(error.response?.data?.message || "error retrieving playlist");
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlistItems: [],
    playlistStatus: "idle", // 'loading', 'succeeded', 'failed', 'playing', 'paused'
    error: null,
  },
 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.playlistStatus = "loading";
        state.error = null;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.playlistStatus = "playing"; // Auto-play on success
        state.playlistItems = action.payload;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.playlistStatus = "failed";
        state.error = action.payload || "could not find playlist";
      });
  },
});

export default playlistSlice.reducer;