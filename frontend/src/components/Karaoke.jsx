import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Karaoke() {
  // const { songId } = useParams(); // Get song ID from URL
  const location = useLocation(); // Get state (media URL)

  const mediaUrl = location.state?.mediaUrl || ""; // Get media URL from state
  if (!mediaUrl) {
    console.error("No media URL found in state");
  }
  else{
    useEffect(() => {
      try{
        axios.post(`http://localhost:5000/api/karaoke`, {
          songUrl: mediaUrl,
        });
      }
      catch(error){
        console.error("Error fetching karaoke song URL.");
     toast.error("Error fetching song URL.");
      }
    }, [mediaUrl]);
  } 

  return (
    <div>
      <h1>Karaoke Page</h1>
      {/* <p>Song ID: {songId}</p> */}

      {mediaUrl ? (
        <audio controls>
          <source src={mediaUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading song...</p>
      )}
    </div>
  );
}

export default Karaoke;
