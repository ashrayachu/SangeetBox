
const fetchPlaylist = require("../utlis/fetchPlaylist");

const playlistModule = async (req, res) => {
  const { playlistId } = req.query;
  if (!playlistId) {
    return res.status(400).json({ message: "Missing playlistId in request query" });
  }
  try {
    const playlistItems = await fetchPlaylist(playlistId);
    res.status(200).json({ success: true, data: playlistItems });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error fetching playlist, might be rapid api error", error: error });
  }
};

module.exports = { playlistModule };
