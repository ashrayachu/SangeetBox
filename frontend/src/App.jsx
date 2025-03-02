import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Karaoke from "./components/Karaoke";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import Playlist from "./pages/Playlist";

import Footer from "./components/Footer";
import Test from "./components/Test";


function App() {
  // const [maximize, setMaximize] = useState(false); // Moved state to App
  return (
    <Router>
      <ToastContainer />
      <div className="h-screen flex flex-col ">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <div className=" flex-grow overflow-auto ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/karaoke/:songId" element={<Karaoke />} />
              <Route path="/error" element={<Error />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
            </Routes>
          </div>
        </div>
        <Footer />
        <div className="relative z-50">
          <MusicPlayer />
        </div>

      </div>
    </Router>
    // <Router>
    //   <div className={`h-screen flex flex-col ${maximize ? "relative" : ""}`}>
    //     {maximize && <MusicPlayer maximize={maximize} setMaximize={setMaximize} />}
    //     <Navbar />
    //     <div className={`flex flex-grow ${maximize ? "hidden" : "flex"}`}>
    //       <Sidebar />
    //       <div className="flex-grow overflow-auto">
    //         <Routes>
    //           <Route path="/test" element={<Test />} />
    //           <Route path="/" element={<Home />} />
    //           <Route path="/search/:query" element={<Search />} />
    //           <Route path="/karaoke/:songId" element={<Karaoke />} />
    //           <Route path="/musicplayer" element={<MusicPlayer maximize={maximize} setMaximize={setMaximize} />} />
    //         </Routes>
    //         <Footer/>
    //       </div>
    //     </div>
    //     {!maximize && <MusicPlayer maximize={maximize} setMaximize={setMaximize} />}
    //   </div>
    // </Router>
  );
}

export default App;
