import { Outlet, NavLink } from 'react-router-dom';
import Main from '../Main/Main';
import { AuthGuard } from '../../utils/AuthGuard';

const AdminLayout = () => {
      const links = [
            { label: 'Fmed articles', path: '/admin/list-article' },
            { label: 'Donateur', path: '/admin/list-donateur' },
            { label: 'Evenement articles', path: '/admin/event-list' },
            { label: 'Registre de payement', path: '/admin/payment-register' },
            { label: 'Membre', path: '/admin/list-member' },
            { label: 'temoignage', path: '/admin/list-testimonial' },
            { label: 'Parametre du site', path: '/admin/settings' },
      ];

      return (
            <Main>
                  {/* Message pour petits écrans */}
                  <div className="lg:hidden min-h-[50vh] flex items-center justify-center text-center px-4">
                        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl shadow-md">
                              <p className="text-lg font-semibold">
                                    Interface non disponible sur mobile ou tablette.
                              </p>
                              <p className="text-sm mt-2">
                                    Veuillez vous connecter sur un ordinateur pour accéder à
                                    l'espace admin.
                              </p>
                        </div>
                  </div>

                  <section className="container">
                        {/* Interface admin pour desktop */}
                        <section className="px-6 py-6 hidden lg:block">
                              <div className="flex gap-6">
                                    <aside className="w-60 bg-white shadow rounded-xl p-4">
                                          <ul className="space-y-2">
                                                {links.map((link, index) => (
                                                      <li key={index}>
                                                            <NavLink
                                                                  to={link.path}
                                                                  className={({ isActive }) =>
                                                                        `block px-4 py-2 rounded text-sm font-medium ${
                                                                              isActive
                                                                                    ? 'bg-yellow-400 text-black'
                                                                                    : 'text-gray-800 hover:bg-yellow-200'
                                                                        }`
                                                                  }
                                                            >
                                                                  {link.label}
                                                            </NavLink>
                                                      </li>
                                                ))}
                                          </ul>
                                    </aside>

                                    <main className="flex-1 bg-white shadow rounded-xl p-6 relative">
                                          <AuthGuard />;
                                          <Outlet />
                                    </main>
                              </div>
                        </section>
                  </section>
            </Main>
      );
};

export default AdminLayout;
