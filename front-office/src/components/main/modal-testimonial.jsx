const ModalTestimonial = ({ isOpen, onClose, children }) => {
      if (!isOpen) return null;

      return (
            <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={onClose}
            >
                  <div
                        className="bg-white rounded-xl p-6 max-w-lg w-full relative"
                        onClick={(e) => e.stopPropagation()}
                  >
                        <button
                              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                              onClick={onClose}
                        >
                              &times;
                        </button>
                        {children}
                  </div>
            </div>
      );
};

export default ModalTestimonial;
