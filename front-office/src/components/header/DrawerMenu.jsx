import React, { useState } from 'react';
import fmed_logo from '../../assets/logo/FMED LOGO.png';
import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import youtube from '../../assets/icons/youtube.png';
import instagram from '../../assets/icons/insta.png';
import DrawerSubMenu from './DrawerSubMenu';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './../main/language-selector';

function DrawerMenu() {
      const [isOpen, setIsOpen] = useState(false);

      const toggleDrawer = () => setIsOpen(!isOpen);

      const { t } = useTranslation();

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
                                    title={t('whoWeAre')}
                                    links={[
                                          { href: '/about/history', label: t('ourStory') },
                                          { href: '/about/mission', label: t('ourMission') },
                                          { href: '/our-teams', label: t('team') },
                                    ]}
                              />

                              <DrawerSubMenu
                                    title={t('getInvolved')}
                                    links={[{ href: '/member-form', label: t('becomeVolunteer') }]}
                              />

                              <DrawerSubMenu
                                    title={t('stayInformed')}
                                    links={[
                                          { href: '/gallery', label: t('achievements') },
                                          { href: '/list-event', label: t('events') },
                                    ]}
                              />

                              <DrawerSubMenu
                                    title="FONSEJ"
                                    links={[
                                          { href: '/about/fonsej', label: t('overview') },
                                          { href: '/fonsej-news', label: t('news') },
                                          { href: '/fonsej-form', label: t('fonsejForm') },
                                    ]}
                              />
                        </ul>

                        <div className="flex flex-col gap-4 text-base">
                              <a
                                    href="/payment"
                                    className=" md:hidden bg-gold hover:bg-yellow-400
                               text-black font-semibold py-2 px-6 rounded-full shadow-md 
                               transition duration-300 text-center"
                              >
                                    {t('donateNow')}
                              </a>

                              <div className="flex items-center justify-center gap-3">
                                    <div className="w-8 h-8">
                                          <a
                                                href="https://www.facebook.com/profile.php?id=100081306009776"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                          >
                                                <img src={facebook} alt="logo for facebook" />
                                          </a>
                                    </div>
                                    <div className="w-8 h-8">
                                          <a
                                                href="https://www.youtube.com/@Fmed_Officiel"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                          >
                                                <img src={youtube} alt="logo for youtube" />
                                          </a>
                                    </div>
                                    <div className="w-8 h-8">
                                          <a
                                                href="https://twitter.com/Fmed_Officiel"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                          >
                                                <img src={twitter} alt="logo for twitter" />
                                          </a>
                                    </div>
                                    <div className="w-8 h-8">
                                          <a
                                                href="https://www.instagram.com/fmed_mali2012/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                          >
                                                <img src={instagram} alt="logo for instagram" />
                                          </a>
                                    </div>
                              </div>

                              <LanguageSelector />
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
