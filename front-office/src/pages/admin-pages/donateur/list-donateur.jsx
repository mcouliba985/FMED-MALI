import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import { Pagination } from 'react-bootstrap';

const DonateurList = () => {
      const [donators, setDonators] = useState([]);
      const [filter, setFilter] = useState('all'); // 'all', 'entreprise', 'particulier'

      const itemsPerPage = 10;
      const [currentPage, setCurrentPage] = useState(1);

      const filteredDonators = donators.filter((d) => {
            if (filter === 'all') return true;
            return d.type?.toLowerCase() === filter;
      });

      const totalPages = Math.ceil(filteredDonators.length / itemsPerPage);
      const paginated = filteredDonators.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );

      useEffect(() => {
            async function fetchFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getDonators);

                        // Vérifie si la réponse HTTP est correcte (status 2xx)
                        if (!fetchRequest.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des articles :',
                                    fetchRequest.status
                              );
                              return;
                        }

                        const response = await fetchRequest.json();

                        // Vérifie si la réponse est bien un tableau
                        if (Array.isArray(response)) {
                              setDonators(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }

            fetchFunc();
      }, []);
      return (
            <div className="bg-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-1">Liste des donateurs FMED</h2>
                  <p className="text-sm text-gray-600 mb-4">
                        Tous les donateurs en un seul endroit. Suivez leurs contributions et accédez
                        à leurs informations en toute simplicité.
                  </p>

                  <div className="flex justify-end gap-4 mb-4">
                        <div className="flex justify-end mb-4">
                              <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold"
                              >
                                    <option value="all">Tous</option>
                                    <option value="entreprise">Entreprises</option>
                                    <option value="particulier">Particuliers</option>
                              </select>
                        </div>
                  </div>

                  <div className="overflow-auto">
                        <table className="min-w-full text-sm text-left">
                              <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                          <th className="px-4 py-2">N°</th>
                                          <th className="px-4 py-2">Nom complet</th>
                                          <th className="px-4 py-2">tel</th>
                                          <th className="px-4 py-2">address</th>
                                          <th className="px-4 py-2">type</th>
                                          <th className="px-4 py-2">option</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {paginated.map((paginate, index) => (
                                          <tr key={paginate.id} className="border-t">
                                                <td className="px-4 py-2">{index + 1}</td>
                                                <td className="px-4 py-2">
                                                      {paginate.firstName} {paginate.lastName}
                                                </td>
                                                <td className="px-4 py-2">{paginate.phone}</td>
                                                <td className="px-4 py-2 capitalize">
                                                      {paginate.address}
                                                </td>
                                                <td className="px-4 py-2 capitalize">
                                                      {paginate.type}
                                                </td>
                                                <td className="px-4 py-2">
                                                      <div className="flex justify-center gap-2">
                                                            <Link
                                                                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                                                                  to={`/admin/preview-donator/${paginate.id}`}
                                                            >
                                                                  <i class="far fa-eye"></i>
                                                            </Link>
                                                      </div>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>

                        <div className="flex justify-end">
                              <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default DonateurList;
