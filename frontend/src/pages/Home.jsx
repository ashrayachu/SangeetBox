import React from 'react';

import FeaturedSongs from '../components/FeaturedSongs';


const Home = () => {
    return (
        <div className="h-screen  flex flex-col">
            <div className=" overflow-hidden ">   
                <h1 className='text-red-600' style={{ color: 'black' }}>this is home</h1> 
                <FeaturedSongs />
            </div>  
        </div>
    );
};

export default Home;