const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const createKaraokeTrack = async (req, res) => {
    const { songUrl } = req.body;
    if (!songUrl) return res.status(400).json({ error: "Song URL is required" });

    const outputDir = path.join(__dirname, "../karaoke_tracks");
    const mp3Path = path.join(outputDir, "song.mp3");
    const instrumentalPath = path.join(outputDir, "instrumental.mp3");

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    try {
        const response = await axios({ method: "GET", url: songUrl, responseType: "stream" });
        const writer = fs.createWriteStream(mp3Path);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => writer.on("finish", resolve).on("error", reject));

        ffmpeg(mp3Path)
            .audioFilters("pan=stereo|c0=FL|c1=FR")
            .save(instrumentalPath)
            .on("end", () => {
                res.sendFile(instrumentalPath, () => {
                    fs.unlinkSync(instrumentalPath);
                    fs.unlinkSync(mp3Path);
                });
            })
            .on("error", (err) => res.status(500).json({ error: "Failed to process karaoke track" }));
    } catch (error) {
        res.status(500).json({ error: "Failed to download song" });
    }
};

module.exports = { createKaraokeTrack };
