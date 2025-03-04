const Song = require("../models/Song");

const alltracks = async (req, res) => {
    console.log("alltracks");
    try {
        const allSongs = await Song.find();
        res.json(allSongs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { alltracks };
