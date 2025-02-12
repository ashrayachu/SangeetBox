const express = require("express");
const { playSong } = require("../controllers/songController");

const router = express.Router();

router.post("/play", playSong);

module.exports = router;
