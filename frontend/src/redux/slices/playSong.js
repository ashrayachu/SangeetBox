import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// 🎵 Async function to play a song (API call)
export const playSong = createAsyncThunk(
  "player/playSong",
  async ({ songId, songUrl }, { rejectWithValue }) => {
   
    try {
      console.log("Sending request:", { songId, songUrl });
      const response = await axios.post("http://localhost:5000/api/play", {
        songId,
        songUrl,
      });
      return response.data;
    } catch (error) {
     
      toast.error("Error playing song. Try again later.");
      return rejectWithValue(error.response?.data?.message || "Playback failed");
    }
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    status: "idle", // 'loading', 'succeeded', 'failed', 'playing', 'paused'
    error: null,
    maximize:false
  },
 
  reducers: {
    // ⏯ Toggle play/pause state
    playPause: (state) => {
      if (state.status === "playing") {
        state.status = "paused";
      } else if (state.currentSong) {
        state.status = "playing";
      }
    },
    toggleMaximize: (state) => {
      state.maximize = !state.maximize; // ✅ Toggle maximize state
    },

    // ⏹ Stop the song
    stopSong: (state) => {
      state.status = "stopped";
      state.currentSong = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(playSong.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(playSong.fulfilled, (state, action) => {
        state.status = "playing"; // Auto-play on success
        state.currentSong = action.payload;
      })
      .addCase(playSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Playback failed";
      });
  },
});

export const { playPause, stopSong, toggleMaximize } = playerSlice.actions;
export default playerSlice.reducer;
