const express = require("express");
const { playlistModule } = require("../controllers/playlistController");

const router = express.Router();

router.get("/playlist", playlistModule);

module.exports = router;