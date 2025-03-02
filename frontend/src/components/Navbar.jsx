import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSongs } from "../redux/slices/searchSong";
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    Home,
    Globe ,
    Laptop2,
    LayoutList,
    Library,
    Maximize2,
    Mic2,
    Play,
    Plus,
    Radio,
    Repeat,
    Search,
    Shuffle,
    SkipBack,
    SkipForward,
    Volume2,
} from "lucide-react"


const Navbar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        if(query){
        navigate(`/search/${query}`);
        }
        else{
            alert("Please enter a search query")
        }
    };

    return (
        <div className="sticky top-0 bg-black bg-opacity-90 p-4 flex justify-between items-center gap-4">
            <div className="hidden md:flex">
                <button className="bg-black rounded-full p-1">
                    <span className="h-6 w-6 ">logo </span>
                </button>
            </div>
            <div className="flex gap-2 w-[450px] items-center">
                <div className='bg-neutral-700 rounded-full p-2'>
                    <Home className="h-6 w-6 text-white hover:text-white" onClick={() => navigate('/')} />
                </div>
                <div className="bg-neutral-700 rounded-full w-full flex items-center gap-2 px-4 py-2 ">
                    <Search className="h-5 w-5 text-white"  />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border-none outline-none text-white w-full"
                        placeholder="What do you want to listen to?"
                    />
                    <Globe className="h-5 w-5 text-white" onClick={handleSearch}  />
                </div>

            </div>
            <div className='hidden md:flex gap-4 items-center'>
                <button className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">Install App</button>
                <button className="bg-black rounded-full p-2">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="bg-black rounded-full h-8 w-8 flex items-center justify-center text-white">O</button>
            </div>
        </div>
    );
}

export default Navbar;