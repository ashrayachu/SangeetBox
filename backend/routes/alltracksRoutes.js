const express = require("express");
const { alltracks } = require("../controllers/alltracksController.js"); // Ensure file name matches exactly

const router = express.Router();

router.get("/tracks",alltracks );
module.exports = router;
