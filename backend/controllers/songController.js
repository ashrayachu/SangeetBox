const Song = require("../models/Song");
const cloudinary = require("../config/cloudinaryConfig");
const fetchSong = require("../utlis/fetchSong");

const playSong = async (req, res) => {
  const { songUrl, songId } = req.body;

  try {
    const existingSong = await Song.findOne({ songId });
    if (existingSong) {
      return res.json({ success: true, url: existingSong.cloudinaryUrl, songId });
    }
     
    const {audioUrl, songName}  = await fetchSong(songUrl);
    

    const uploadResult = await cloudinary.uploader.upload(audioUrl, {
      resource_type: "video",
      folder: "songs",
      public_id: songId,
      format: "mp3",
    });
    console.log(uploadResult);
    const newSong = new Song({ songId, name: songName, cloudinaryUrl: uploadResult.secure_url });
    await newSong.save();

    res.json({ success: true, url: uploadResult.secure_url, songId });
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error", error:error.message });
  }
};

module.exports = { playSong };
