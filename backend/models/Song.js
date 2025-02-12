const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songId: { type: String, required: true, unique: true },
  cloudinaryUrl: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Song", songSchema);