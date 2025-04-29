import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Error = () => {
      return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                  <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                  >
                        <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
                        <p className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
                              Page non trouvée
                        </p>
                        <p className="text-gray-600 mb-6">
                              Oups ! La page que vous recherchez n’existe pas ou a été déplacée.
                        </p>
                        <Link
                              to="/"
                              className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition"
                        >
                              Retour à l’accueil
                        </Link>
                  </motion.div>
                  <motion.img
                        src="https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716_640.png"
                        alt="404 illustration"
                        className="w-full max-w-64 mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                  />
            </div>
      );
};

export default Error;
