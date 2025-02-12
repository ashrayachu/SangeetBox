import React from 'react';
import {Link} from 'react-router-dom';  
import { useLocation } from "react-router-dom";

const Error = () => {
    const location = useLocation();
 
    const errorMessage = location.state?.message || "Something went wrong.";
    const status = location.state?.status || "404";

    console.log("errorMessage", errorMessage)
    console.log("status", status)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">{status}</h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</h2>
      <p className="text-gray-500 dark:text-gray-500 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <button>
        <Link className='text-white hover:text-blue-400' to='/'>Return to Home</Link>
      </button>
    </div>
  )
}
export default Error;