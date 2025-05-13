import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
      const pages = [];

      for (let i = 1; i <= totalPages; i++) {
            pages.push(
                  <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`px-3 py-1 rounded ${
                              currentPage === i
                                    ? 'bg-yellow-400 text-black font-semibold'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                  >
                        {i}
                  </button>
            );
      }

      return (
            <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-sm text-gray-600 hover:underline disabled:opacity-50"
                  >
                        «
                  </button>

                  {pages}

                  <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-sm text-gray-600 hover:underline disabled:opacity-50"
                  >
                        »
                  </button>
            </div>
      );
};

export default Pagination;
