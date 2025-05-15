import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';

export default function PreviewArticle() {
      const { articleID } = useParams(); // ✅ extraction correcte
      const [article, setArticle] = useState({});
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            if (!articleID) return; // ✅ évite le fetch si l'ID est manquant

            async function previewArticle() {
                  try {
                        const fetchRequest = await fetch(
                              `${API_ENDPOINTS.getArticles}/${articleID}`
                        );
                        const data = await fetchRequest.json();
                        setArticle(data);

                        console.log(data);
                  } catch (error) {
                        console.error('Erreur de chargement :', error);
                  }
            }

            previewArticle();
      }, [articleID]);

      const handleStatusChange = async (newStatus) => {
            setLoading(true);
            try {
                  const response = await fetch(`${API_ENDPOINTS.getArticles}/${articleID}/status`, {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: newStatus }),
                  });

                  if (!response.ok) throw new Error('Erreur de mise à jour');

                  const updated = await response.json();
                  setArticle(updated); // mise à jour de l'état local
                  window.location.reload();
            } catch (error) {
                  console.error('Erreur de mise à jour du statut :', error);
            } finally {
                  setLoading(false);
            }
      };

      if (!article) return <p className="text-center mt-6">Chargement de l'article...</p>;

      return (
            <div className="max-w-4xl mx-auto bg-white p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <img
                              src={article.imagePath}
                              alt={article.imageName}
                              className="w-full md:w-64 h-auto object-cover rounded-md"
                        />
                        <div>
                              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    {article.title}
                              </h1>
                              <p className="text-sm text-gray-500">
                                    <strong>
                                          {new Date(article.createAt).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                          })}
                                    </strong>{' '}
                                    —{' '}
                                    <span className="text-yellow-600">
                                          catégorie {article.category}
                                    </span>
                              </p>
                              <p className="mt-2 text-gray-700">{article.hook}</p>
                        </div>
                  </div>

                  <div className="mt-6 space-y-4 text-gray-800">
                        <p>{article.content}</p>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                        <a
                              href={`/admin/edit-article/${article.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                              disabled={loading}
                        >
                              Modifier
                        </a>

                        {article.status === 'draft' && (
                              <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('published')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Publier'
                                    )}
                              </button>
                        )}

                        {article.status === 'published' && (
                              <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('disabled')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Desactiver'
                                    )}
                              </button>
                        )}

                        {article.status === 'disabled' && (
                              <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('published')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Reactiver'
                                    )}
                              </button>
                        )}

                        {!['draft', 'published', 'disabled'].includes(article.status) && (
                              <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('published')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Publier'
                                    )}
                              </button>
                        )}
                  </div>
            </div>
      );
}
