import { useState } from 'react';
import { Link } from 'react-router-dom'; // ou <a href="/"> si pas de routing

const LockComponent = () => {
      const [featureDisabled] = useState(true); // à désactiver plus tard

      return (
            <section>
                  {featureDisabled && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 text-white text-center p-4">
                              <i className="fas fa-lock mb-4 text-6xl animate-pulse"></i>
                              <p className="text-2xl mb-4">
                                    Les fonctionnalités de cette page ne sont pas encore
                                    disponibles.
                              </p>
                              <Link
                                    to="/"
                                    className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition"
                              >
                                    Retour à l’accueil
                              </Link>
                        </div>
                  )}
            </section>
      );
};

export default LockComponent;
