import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearError } from "../redux/slices/playSong";

const Error = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleReturn = () => {
    dispatch(clearError());
    navigate('/'); // Navigate back to the home page

  }
  const errorMessage = location.state?.message || "Something went wrong.";
  const status = location.state?.status || "404";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">{status}</h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</h2>
      <p className="text-gray-500 dark:text-gray-500 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <button>
        <span className='text-white hover:text-blue-400' onClick={handleReturn}>Return to Home</span>
      </button>
    </div>
  )
}
export default Error;