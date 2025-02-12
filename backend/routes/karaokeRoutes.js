const express = require("express");
const { createKaraokeTrack } = require("../controllers/karaokeController");

const router = express.Router();

router.post("/karaoke", createKaraokeTrack);

module.exports = router;
