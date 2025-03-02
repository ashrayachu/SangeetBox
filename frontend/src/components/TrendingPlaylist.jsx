import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Navigation } from "swiper/modules";

import React from "react";
import { useNavigate } from "react-router-dom";


const TrendingPlaylists = ({ trendingPlaylists }) => {
    const Navigate = useNavigate();
    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Trending Playlists</h2>

            {trendingPlaylists?.length > 0 && (
                <Swiper
                    slidesPerView={2} // Number of items visible at once
                    spaceBetween={20} // Gap between items
                    freeMode={true} // Enables smooth scrolling
                    breakpoints={{
                        400: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                    modules={[FreeMode, Navigation]}
                    className="mySwiper"

                >
                    {trendingPlaylists.map((playlist) => (
                        <SwiperSlide key={playlist?.id} >
                            <div className="flex flex-col items-center gap-1 w-full hover:bg-neutral-800 p-2 hover:cursor-pointer rounded-lg"
                                onClick={() => Navigate(`/playlist/${playlist?.id}`)}>
                                <div className="w-40 h-40">
                                    <img src={playlist?.images?.[0]?.url || "https://plus.unsplash.com/premium_photo-1682125814077-852e2c5946e8?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                        alt="album cover" className="object-cover w-full h-full rounded-lg" />
                                </div>
                                <div className="text-center">{playlist?.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default TrendingPlaylists;
