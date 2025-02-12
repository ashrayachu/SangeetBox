const https = require("https");

const fetchSong = (songUrl) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            hostname: "spotify-downloader9.p.rapidapi.com",
            port: null,
            path: `/downloadSong?songId=${encodeURIComponent(songUrl)}`,
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
            },
        };

        const apiRequest = https.request(options, (apiResponse) => {
            let chunks = [];

            apiResponse.on("data", (chunk) => chunks.push(chunk));
            apiResponse.on("end", () => {
                try {
                    const body = JSON.parse(Buffer.concat(chunks).toString());
                    

                    if (!body.success || !body.data.downloadLink) {
                        const errorMessage = body.message || "Failed to get download link from API";
                        return reject(new Error(`API Error: ${errorMessage}`));
                     
            
                    }

                    resolve({
                        audioUrl: body.data.downloadLink,
                        songName: body.data.title,
                        
                    });
                } catch (err) {
                    reject(new Error("Error parsing API response"));
                }
            });
        });

        apiRequest.on("error", (e) => reject(new Error(`Error downloading song: ${e.message}`)));
        apiRequest.end();
    });
};

module.exports = fetchSong;
