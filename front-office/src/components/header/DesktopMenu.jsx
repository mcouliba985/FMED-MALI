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
                                    href="/notre-histoire"
                                    className="block px-4 py-2 hover:bg-gray-100"
                              >
                                    Notre histoire
                              </a>
                              <a
                                    href="/notre-mission"
                                    className="block px-4 py-2 hover:bg-gray-100"
                              >
                                    Notre mission
                              </a>
                              <a href="/notre-equipe" className="block px-4 py-2 hover:bg-gray-100">
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
                              <a href="/benevole" className="block px-4 py-2 hover:bg-gray-100">
                                    Devenir bénévole
                              </a>
                              <a href="/don" className="block px-4 py-2 hover:bg-gray-100">
                                    Faire un don
                              </a>
                        </div>
                  </div>

                  {/* Vous informer */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">Vous informer</button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a href="/actualites" className="block px-4 py-2 hover:bg-gray-100">
                                    Actualités
                              </a>
                              <a href="/campagnes" className="block px-4 py-2 hover:bg-gray-100">
                                    Nos campagnes
                              </a>
                        </div>
                  </div>

                  {/* FONSEJ */}
                  <div className="relative group">
                        <button className="text-gray-800 hover:text-medgreen">FONSEJ</button>
                        <div className="absolute top-full left-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-20">
                              <a
                                    href="/fonsej-presentation"
                                    className="block px-4 py-2 hover:bg-gray-100"
                              >
                                    Présentation
                              </a>
                              <a
                                    href="/fonsej-actions"
                                    className="block px-4 py-2 hover:bg-gray-100"
                              >
                                    Nos actions
                              </a>
                        </div>
                  </div>
            </nav>
      );
};

export default DesktopMenu;
