import React from 'react';

const Loader = ({ size = 5, color = 'white' }) => {
      const sizeClass = `h-${size} w-${size}`;
      return (
            <svg
                  className={`animate-spin ${sizeClass} text-${color}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
            >
                  <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                  ></circle>
                  <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
            </svg>
      );
};

export default Loader;
