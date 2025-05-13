import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import { Link } from 'react-router-dom';
import OverlayBlocker from '../../../components/main/overlay-blocked';

const EventList = () => {
      const [articles, setArticles] = useState([]);

      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);

      const totalPages = Math.ceil(articles.length / itemsPerPage);
      const paginatedArticles = articles.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );

      useEffect(() => {
            async function article() {
                  try {
                        const fetchArticle = await fetch(API_ENDPOINTS.getArticles);
                        const response = await fetchArticle.json();
                        setArticles(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            article();
      }, []);

      return (
            <div>
                  <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-1">Liste des evenement FMED</h2>
                        <p className="text-sm text-gray-600 mb-4">
                              Tous les evenement en un seul endroit. Vous pouvez consulter, ajouter
                              ou archiver chaque publication.
                        </p>

                        <div className="flex justify-end gap-4 mb-4">
                              <Link
                                    to={'/admin/add-article'}
                                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 text-sm font-semibold"
                              >
                                    Ajouter un evenement
                              </Link>
                              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold">
                                    Filtrer les evenement
                              </button>
                        </div>

                        <div className="overflow-auto">
                              <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                          <tr>
                                                <th className="px-4 py-2">N°</th>
                                                <th className="px-4 py-2">image</th>
                                                <th className="px-4 py-2">Titre</th>
                                                <th className="px-4 py-2">Date</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2">option</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {paginatedArticles.map((article, index) => (
                                                <tr key={article.id} className="border-t">
                                                      <td className="px-4 py-2">{index + 1}</td>
                                                      <td className="px-4 py-2">
                                                            <img
                                                                  src={article.imagePath}
                                                                  alt={article.imageName}
                                                                  className="w-10 h-10 rounded object-cover"
                                                            />
                                                      </td>
                                                      <td className="px-4 py-2">{article.title}</td>
                                                      <td className="px-4 py-2">
                                                            {new Date(
                                                                  article.createAt
                                                            ).toLocaleDateString('fr-FR', {
                                                                  day: '2-digit',
                                                                  month: 'long',
                                                                  year: 'numeric',
                                                            })}
                                                      </td>
                                                      <td className="px-4 py-2 capitalize">
                                                            {article.status}
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            <div className="flex justify-center gap-2">
                                                                  <Link
                                                                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                                                                        to={`/admin/preview-article/${article.id}`}
                                                                  >
                                                                        <i class="far fa-eye"></i>
                                                                  </Link>
                                                                  <Link
                                                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                                                        to={'/'}
                                                                  >
                                                                        <i class="far fa-trash-can"></i>
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

                  <OverlayBlocker />
            </div>
      );
};

export default EventList;
