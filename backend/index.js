const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const spotifyRoutes = require("./routes/spotifyRoutes");
const songRoutes = require("./routes/songRoutes");
const karaokeRoutes = require("./routes/karaokeRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", spotifyRoutes);
app.use("/api", songRoutes);
app.use("/api", karaokeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
