import React, { useState } from 'react';
import fmed_logo from '../../assets/logo/FMED LOGO.png';
import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import youtube from '../../assets/icons/youtube.png';
import instagram from '../../assets/icons/insta.png';
import DrawerSubMenu from './DrawerSubMenu';

function DrawerMenu() {
      const [isOpen, setIsOpen] = useState(false);

      const toggleDrawer = () => setIsOpen(!isOpen);

      return (
            <div>
                  {/* Bouton Burger */}
                  <button className="btn text-[24px]" onClick={toggleDrawer}>
                        {isOpen ? (
                              <i class="fas fa-xmark"></i>
                        ) : (
                              <i class="fas fa-bars-staggered"></i>
                        )}
                  </button>

                  {/* Drawer Menu */}
                  <div
                        className={`position-fixed top-0 start-0 h-100 bg-light shadow p-4`}
                        style={{
                              width: '300px',
                              transition: 'transform 0.3s ease',
                              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                              zIndex: 1050,
                              overflow: 'auto',
                        }}
                  >
                        <div className="mb-4">
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
                        <ul className="list-unstyled fs-5 mb-4">
                              <DrawerSubMenu
                                    title="Qui sommes-nous"
                                    links={[
                                          { href: '/notre-histoire', label: 'Notre histoire' },
                                          { href: '/notre-mission', label: 'Notre mission' },
                                          { href: '/notre-equipe', label: 'Équipe' },
                                    ]}
                              />

                              <DrawerSubMenu
                                    title="S’engager à nos côtés"
                                    links={[
                                          { href: '/benevole', label: 'Devenir bénévole' },
                                          { href: '/don', label: 'Faire un don' },
                                    ]}
                              />

                              <DrawerSubMenu
                                    title="Vous informer"
                                    links={[
                                          { href: '/actualites', label: 'Actualités' },
                                          { href: '/campagnes', label: 'Nos campagnes' },
                                    ]}
                              />

                              <DrawerSubMenu
                                    title="FONSEJ"
                                    links={[
                                          { href: '/fonsej-presentation', label: 'Présentation' },
                                          { href: '/fonsej-actions', label: 'Nos actions' },
                                    ]}
                              />
                        </ul>

                        <div className="flex flex-col gap-4 text-base">
                              <button
                                    className=" md:hidden bg-gold hover:bg-yellow-400
                               text-black font-semibold py-2 px-6 rounded-full shadow-md 
                               transition duration-300"
                              >
                                    Faire un don
                              </button>

                              <div className="flex items-center justify-center gap-3">
                                    <div className="w-6 h-6">
                                          <img src={facebook} alt="logo for facebook" />
                                    </div>
                                    <div className="w-6 h-6">
                                          <img src={youtube} alt="logo for youtube" />
                                    </div>
                                    <div className="w-6 h-6">
                                          <img src={twitter} alt="logo for twitter" />
                                    </div>
                                    <div className="w-6 h-6">
                                          <img src={instagram} alt="logo for instagram" />
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Overlay quand drawer ouvert */}
                  {isOpen && (
                        <div
                              className="position-fixed top-0 start-0 w-100 h-100"
                              style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040 }}
                              onClick={toggleDrawer}
                        />
                  )}
            </div>
      );
}

export default DrawerMenu;
