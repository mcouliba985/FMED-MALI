import React from 'react';

export default function Modal({ isOpen, onClose, title, message }) {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                  <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4 text-center">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <p className="text-gray-700">{message}</p>
                        <button
                              onClick={onClose}
                              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
                        >
                              Fermer
                        </button>
                  </div>
            </div>
      );
}
