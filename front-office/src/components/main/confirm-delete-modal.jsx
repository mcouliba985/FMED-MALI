import React from 'react';
import Loader from './loader-component';

const ConfirmDeleteModal = ({
      isOpen,
      onClose,
      loading,
      onConfirm,
      title = 'Confirmer la suppression',
      message = 'Voulez-vous vraiment supprimer cet élément ?',
}) => {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{message}</p>

                        <div className="flex justify-end gap-2">
                              <button
                                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={onClose}
                              >
                                    Annuler
                              </button>
                              <button
                                    className="px-5 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={onConfirm}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                          </>
                                    ) : (
                                          'supprimer'
                                    )}
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ConfirmDeleteModal;
