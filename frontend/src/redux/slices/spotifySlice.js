import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// 🎵 Async function to get Spotify Access Token
const getAccessToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
        }
    );

    return response.data.access_token;
};

// 🎵 Fetch Trending Songs (New Releases)
export const fetchTrendingSongs = createAsyncThunk(
    "spotify/fetchTrendingSongs",
    async (_, { rejectWithValue }) => {
        try {
            const token = await getAccessToken();
        
            const response = await axios.get(
                "https://api.spotify.com/v1/browse/new-releases?limit=10",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.albums.items; // Returns song data
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch trending songs");
        }
    }
);

// 🎵 Fetch Trending Playlists
export const fetchTrendingPlaylists = createAsyncThunk(
    "spotify/fetchTrendingPlaylists",
    async (_, { rejectWithValue }) => {
        try {
            const token = await getAccessToken();
            const response = await axios.get(
                "https://api.spotify.com/v1/search?q=bollywoodplaylist&type=playlist&limit=10",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.playlists.items; // Returns playlist data
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch trending playlists");
        }
    }
);

// 🎵 Spotify Slice
const spotifySlice = createSlice({
    name: "spotify",
    initialState: {
        trendingSongs: [],
        trendingPlaylists: [],
        status: "idle",
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // 🎵 Handle Trending Songs
            .addCase(fetchTrendingSongs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTrendingSongs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.trendingSongs = action.payload;
            })
            .addCase(fetchTrendingSongs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🎵 Handle Trending Playlists
            .addCase(fetchTrendingPlaylists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTrendingPlaylists.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.trendingPlaylists = action.payload;
            })
            .addCase(fetchTrendingPlaylists.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default spotifySlice.reducer;
