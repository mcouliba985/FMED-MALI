import React from 'react';

const OverlayBlocker = ({ visible = true }) => {
      if (!visible) return null;

      return (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center rounded-xl">
                  <div className="text-white px-6 py-4 rounded text-center max-w-md">
                        <i className="fas fa-lock mb-4 text-6xl animate-pulse"></i>
                        <p className="text-2xl mb-4">
                              Les fonctionnalités de cette page ne sont pas encore disponibles.
                        </p>
                  </div>
            </div>
      );
};

export default OverlayBlocker;
