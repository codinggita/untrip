import React, { useEffect, useState } from "react";

const NotFound = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-indigo-600 transition-all duration-100" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="p-8">
          {/* Error Status */}
          <div className="flex items-center mb-6">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              404
            </span>
            <div className="ml-4 h-12 w-px bg-gray-200"></div>
            <div className="ml-4">
              <span className="block text-sm text-gray-500 font-medium">ERROR</span>
              <span className="block text-xl font-bold text-gray-900">Page not found</span>
            </div>
          </div>
          
          {/* Message */}
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
          
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                ?
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go Back
            </button>
            <a
              href="/"
              className="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;