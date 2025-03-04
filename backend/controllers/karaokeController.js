const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const createKaraokeTrack = async (req, res) => {

    try {

    }
    catch (error) {
        res.status(500).json({ error: "Failed to download song" });
    }
};

module.exports = { createKaraokeTrack };
