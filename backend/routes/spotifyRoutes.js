const express = require("express");
const { searchTracks } = require("../controllers/spotifyController");

const router = express.Router();

router.get("/search", searchTracks);

module.exports = router;
