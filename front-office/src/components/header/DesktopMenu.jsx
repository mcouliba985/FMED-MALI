const DesktopMenu = () => {
      return (
            <nav className="hidden lg:flex items-center gap-8 text-[18px] font-poppins font-light">
                  {/* Réutilise les menus ici (copiés depuis ton code) */}
                  {/* Qui sommes-nous */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">
                              Qui sommes-nous
                        </button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/about/history"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Notre histoire
                              </a>
                              <a
                                    href="/about/mission"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Notre mission
                              </a>
                              <a
                                    href="/our-teams"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Équipe
                              </a>
                        </div>
                  </div>

                  {/* S’engager à nos côtés */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">
                              S’engager à nos côtés
                        </button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/member-form"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Devenir bénévole
                              </a>
                              <a
                                    href="/fonsej-form"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Formulaire Fonsej
                              </a>
                        </div>
                  </div>

                  {/* Vous informer */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">Vous informer</button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/gallery"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Nos Réalisations
                              </a>
                              <a
                                    href="/list-event"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Nos Evénements
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
                                    Présentation
                              </a>
                              <a
                                    href="/fonsej-news"
                                    className="block px-4 py-2 hover:bg-medgreen hover:text-white"
                              >
                                    Actualités
                              </a>
                        </div>
                  </div>
            </nav>
      );
};

export default DesktopMenu;
