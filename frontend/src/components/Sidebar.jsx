import React from 'react';
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    Home,
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

const Sidebar = () => {
    return (
        <div className="hidden w-[420px] bg-black  p-2 md:flex flex-col gap-2 min-h-screen ">
            <div className="bg-neutral-900 rounded-lg p-4">
                <div className="flex items-center gap-2 text-white mb-4">
                    <Library className="h-6 w-6" />
                    <span className="font-semibold">Your Library</span>
                    <Plus className="h-5 w-5 ml-auto" />
                    <ChevronRight className="h-5 w-5" />
                </div>
                <div className="flex gap-2 text-sm">
                    <button className="bg-neutral-800 px-3 py-1 rounded-full">Playlists</button>
                    <button className="bg-neutral-800 px-3 py-1 rounded-full">Artists</button>
                    <button className="bg-neutral-800 px-3 py-1 rounded-full">Podcasts & Shows</button>
                </div>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 bg-neutral-900 rounded-lg overflow-y-auto max-h-[calc(100vh-150px)]">
                {/* Library Items */}
                <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white">❤️</span>
                        </div>
                        <div>
                            <div className="font-semibold">Liked Songs</div>
                            <div className="text-sm text-neutral-400">Playlist • 28 songs</div>
                        </div>
                    </div>
                </div>
                {/* Duplicate this block multiple times to test scrolling */}
                <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white">🎵</span>
                        </div>
                        <div>
                            <div className="font-semibold">Top Hits</div>
                            <div className="text-sm text-neutral-400">Playlist • 50 songs</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;