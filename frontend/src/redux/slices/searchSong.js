import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

// Async function to search songs
export const searchSongs = createAsyncThunk("search/searchSongs", async (query, { rejectWithValue }) => {
  if (!query) {
    toast.error("Please enter a search term!");
    return rejectWithValue("No search query provided");
  }

  try {
    const response = await axios.get(`${API_URL}/api/search`, {
      params: { query },
    });
  
    return response.data;
  } catch (error) {
    toast.error("Error searching songs. Try again later.");
    return rejectWithValue(error.response?.data?.message || "Search failed");
  }
});

const searchSlice = createSlice({
  name: "search",  // ✅ Changed to "search" to match its purpose
  initialState: {
    searchResults: [],  // ✅ Removed unnecessary `songs` state
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.status = "loading";
        state.error = null;  // ✅ Reset error on new search
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Search failed";  // ✅ Ensuring error handling is correct
      });
  },
});

export default searchSlice.reducer;
