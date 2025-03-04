const axios = require("axios");
require("dotenv").config();

let spotifyToken = "";

const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );


    spotifyToken = response.data.access_token;
  } catch (error) {
    console.log("Error getting Spotify token:", error);
  }
};
getSpotifyToken();


const searchTracks = async (req, res) => {
  const { query } = req.query;
  console.log("query", query);

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  if (!spotifyToken) {
    console.error("Spotify token is missing, crashing app...");
    process.exit(1); // Force a crash if no token is available
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track,playlist&limit=10`,
      { headers: { Authorization: `Bearer ${spotifyToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error searching tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch songs from Spotify" });
    process.exit(1)
  }
};

module.exports = { getSpotifyToken, searchTracks };
