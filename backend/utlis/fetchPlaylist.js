
const https = require("https");

const fetchPlaylist = (playlistId) => {
    
    return new Promise((resolve, reject) => {
        if (!process.env.RAPIDAPI_KEY) {
            return reject(new Error("Missing RAPIDAPI_KEY in environment variables"));
        }
        const cleanPlaylistId = playlistId.trim();


        const params = new URLSearchParams({
            id:cleanPlaylistId,
            offset: 0,
            limit: 100
        }).toString();

        const options = {
            method: 'GET',
            hostname: 'spotify23.p.rapidapi.com',
            port: null,
            path: `/playlist_tracks/?${params}`,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };
     


        const apiRequest = https.request(options, (apiResponse) => {
            let chunks = [];
            apiResponse.on("data", (chunk) => chunks.push(chunk));
            apiResponse.on("end", () => {
                try {
                    const rawData = Buffer.concat(chunks).toString();
                    const body = JSON.parse(rawData);
              
                    if (!body) {
                        return reject(new Error(body.message || "Failed to fetch playlist data"));    
                    } 
                    resolve(body);
                } catch (err) {
                    reject(new Error("Error parsing API response"));
                }
            });
        });

        apiRequest.on("error", (e) => reject(new Error(`Error downloading playlist: ${e.message}`)));

        apiRequest.end();
    });


};

module.exports = fetchPlaylist;
