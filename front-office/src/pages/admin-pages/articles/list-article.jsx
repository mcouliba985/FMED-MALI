import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/main/pagination';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import ConfirmDeleteModal from '../../../components/main/confirm-delete-modal';
import { useTranslation } from 'react-i18next';

const ArticleList = () => {
      const [articles, setArticles] = useState([]);
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedId, setSelectedId] = useState(null);
      const [loading, setLoading] = useState(false);

      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);

      const { i18n } = useTranslation();
      const currentLang = i18n.language || 'fr';

      // Pagination calculée
      const totalPages = Math.ceil(articles.length / itemsPerPage);
      const paginatedArticles = articles.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );

      // Ouvrir la modale de confirmation
      const handleDeleteClick = (id) => {
            setSelectedId(id);
            setModalOpen(true);
      };

      // Récupération des articles
      useEffect(() => {
            async function fetchArticles() {
                  try {
                        const res = await fetch(API_ENDPOINTS.getArticles);

                        if (!res.ok) {
                              console.error('Erreur HTTP :', res.status);
                              return;
                        }

                        const data = await res.json();

                        if (Array.isArray(data)) {
                              setArticles(data);
                        } else {
                              console.warn('Format inattendu :', data);
                        }
                  } catch (error) {
                        console.error('Erreur récupération articles :', error);
                  }
            }

            fetchArticles();
      }, []);

      // Suppression article
      const handleConfirmDelete = async () => {
            if (!selectedId) return;
            setLoading(true);

            try {
                  await fetch(`${API_ENDPOINTS.getArticles}/delete/${selectedId}`, {
                        method: 'DELETE',
                  });
                  setArticles((prev) => prev.filter((art) => art.id !== selectedId));
            } catch (error) {
                  console.error('Erreur suppression :', error);
            } finally {
                  setModalOpen(false);
                  setSelectedId(null);
                  setLoading(false);
            }
      };

      return (
            <div className="bg-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-1">Liste des articles FMED</h2>
                  <p className="text-sm text-gray-600 mb-4">
                        Tous les articles en un seul endroit. Vous pouvez consulter, ajouter ou
                        archiver chaque publication.
                  </p>

                  <div className="flex justify-end gap-4 mb-4">
                        <Link
                              to={'/admin/add-article'}
                              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 text-sm font-semibold"
                        >
                              Ajouter un article
                        </Link>
                        <button className="hidden bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold">
                              Filtrer les articles
                        </button>
                  </div>

                  <div className="overflow-auto">
                        <table className="min-w-full text-sm text-left">
                              <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                          <th className="px-4 py-2">N°</th>
                                          <th className="px-4 py-2">Image</th>
                                          <th className="px-4 py-2">Titre</th>
                                          <th className="px-4 py-2">Catégorie</th>
                                          <th className="px-4 py-2">Date</th>
                                          <th className="px-4 py-2">Status</th>
                                          <th className="px-4 py-2">Option</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {paginatedArticles.map((article, index) => (
                                          <tr key={article.id} className="border-t">
                                                <td className="px-4 py-2">
                                                      {(currentPage - 1) * itemsPerPage + index + 1}
                                                </td>
                                                <td className="px-4 py-2">
                                                      <img
                                                            src={article.imagePath}
                                                            alt={article.imageName}
                                                            className="w-10 h-10 rounded object-cover"
                                                      />
                                                </td>
                                                <td className="px-4 py-2">
                                                      {article.title?.[currentLang] ||
                                                            article.title?.fr}
                                                </td>
                                                <td className="px-4 py-2 capitalize">
                                                      {article.category}
                                                </td>
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
                                                                  <i className="far fa-eye"></i>
                                                            </Link>
                                                            <button
                                                                  className="text-red-600 hover:text-red-800"
                                                                  onClick={() =>
                                                                        handleDeleteClick(
                                                                              article.id
                                                                        )
                                                                  }
                                                            >
                                                                  <i className="far fa-trash-can"></i>
                                                            </button>
                                                      </div>

                                                      <ConfirmDeleteModal
                                                            isOpen={modalOpen}
                                                            onClose={() => setModalOpen(false)}
                                                            loading={loading}
                                                            onConfirm={handleConfirmDelete}
                                                            title="Suppression d’un article"
                                                            message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                                                      />
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

export default ArticleList;
