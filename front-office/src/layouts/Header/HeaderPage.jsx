import { useNavigate } from 'react-router-dom';
import fmed_logo from '../../assets/logo/FMED LOGO.png';
import DesktopMenu from '../../components/header/DesktopMenu';
import DrawerMenu from '../../components/header/DrawerMenu';
import Toolbar from '../../components/header/Toolbar';
import { useEffect, useState } from 'react';

export default function HeaderPage() {
      const [isSticky, setIsSticky] = useState(false);

      const navigate = useNavigate();

      useEffect(() => {
            const handleScroll = () => {
                  if (window.scrollY > 50) {
                        // Dès que tu scrolles de 50px
                        setIsSticky(true);
                  } else {
                        setIsSticky(false);
                  }
            };

            window.addEventListener('scroll', handleScroll);

            // Nettoyage quand le composant est démonté
            return () => {
                  window.removeEventListener('scroll', handleScroll);
            };
      }, []);

      return (
            <header className="container bg-white">
                  <Toolbar />
                  <header
                        className={`${isSticky ? 'fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-1000 ease-in-out' : 'relative '} transition-all duration-300 px-4 py-3`}
                  >
                        <div className="flex lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                              {/* Logo + Texte */}
                              <div className="flex items-center gap-2">
                                    <a href="/" className="flex items-center gap-2">
                                          <img
                                                className="w-8 md:w-12 lg:w-16"
                                                src={fmed_logo}
                                                alt="logo FMED MALI"
                                          />
                                          <h2 className="lg:hidden font-poppins text-xl font-bold">
                                                FMED <span className="text-gold">MALI</span>
                                          </h2>
                                    </a>
                              </div>

                              <DesktopMenu />

                              {/* Bouton Faire un don */}
                              <div
                                    onClick={() => navigate('/payment')}
                                    className="flex gap-8  flex-shrink-0"
                              >
                                    <button className="hidden md:flex bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300">
                                          Faire un don
                                    </button>

                                    <div className="lg:hidden text-[3px]">
                                          <DrawerMenu />
                                    </div>
                              </div>
                        </div>
                  </header>
            </header>
      );
}
