import { useTranslation } from 'react-i18next';

const DesktopMenu = () => {
      const { t } = useTranslation();
      return (
            <nav className="hidden lg:flex items-center gap-8 text-[18px] font-poppins font-light">
                  {/* Réutilise les menus ici (copiés depuis ton code) */}
                  {/* Qui sommes-nous */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">
                              {t('whoWeAre')}
                        </button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/about/history"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('ourStory')}
                              </a>
                              <a
                                    href="/about/mission"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('ourMission')}
                              </a>
                              <a
                                    href="/our-teams"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('team')}
                              </a>
                        </div>
                  </div>

                  {/* S’engager à nos côtés */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">
                              {t('getInvolved')}
                        </button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/member-form"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('becomeVolunteer')}
                              </a>
                        </div>
                  </div>

                  {/* Vous informer */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">
                              {t('stayInformed')}
                        </button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/gallery"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('achievements')}
                              </a>
                              <a
                                    href="/list-event"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('events')}
                              </a>
                        </div>
                  </div>

                  {/* FONSEJ */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">FONSEJ</button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/about/fonsej"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('overview')}
                              </a>
                              <a
                                    href="/fonsej-news"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('news')}
                              </a>
                              <a
                                    href="/fonsej-form"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    {t('fonsejForm')}
                              </a>
                        </div>
                  </div>
            </nav>
      );
};

export default DesktopMenu;
