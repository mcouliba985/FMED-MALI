import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../../../components/main/confirm-delete-modal';

const TestimonialList = () => {
      const [testimonials, setTestimonials] = useState([]);
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedId, setSelectedId] = useState(null);
      const [loading, setLoading] = useState(false);

      // Ouvre le modal
      const handleDeleteClick = (id) => {
            setSelectedId(id);
            setModalOpen(true);
      };

      // Confirmer la suppression
      const handleConfirmDelete = async () => {
            setLoading(true);

            try {
                  await fetch(`${API_ENDPOINTS.getTestimonial}/delete/${selectedId}`, {
                        method: 'DELETE',
                  });
                  // TODO : Mettre à jour la liste après suppression
            } catch (error) {
                  console.error('Erreur lors de la suppression :', error);
            } finally {
                  setModalOpen(false);
                  setSelectedId(null);
                  setLoading(true);
                  window.location.reload();
            }
      };

      useEffect(() => {
            async function TestimonialFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getTestimonial);

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
                              setTestimonials(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            TestimonialFunc();
      }, []);

      return (
            <div className="max-w-6xl">
                  <div className="flex justify-between">
                        <h2 className="text-3xl font-bold mb-8">Témoignages</h2>
                        <div>
                              <Link
                                    className="bg-gold text-white hover:bg-yellow-400 rounded-lg px-4 py-2"
                                    to={'/admin/create-testimonial'}
                              >
                                    Ajouter un nouveau
                              </Link>
                        </div>
                  </div>

                  {loading ? (
                        <div className="text-center text-gray-500">Chargement...</div>
                  ) : testimonials.length === 0 ? (
                        <div className="text-center text-gray-500">Aucun témoignage trouvé.</div>
                  ) : (
                        <div className="overflow-x-auto">
                              <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
                                    <thead>
                                          <tr className="bg-gray-100 text-left">
                                                <th className="py-3 px-4 border-b">Image</th>
                                                <th className="py-3 px-4 border-b">Nom</th>
                                                <th className="py-3 px-4 border-b">Poste</th>
                                                <th className="py-3 px-4 border-b">Message</th>
                                                <th className="py-3 px-4 border-b">Date</th>
                                                <th className="py-3 px-1 border-b">option</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {testimonials.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                      <td className="py-3 px-4 border-b">
                                                            {item.imagePath ? (
                                                                  <img
                                                                        src={item.imagePath}
                                                                        alt={item.fullName}
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                  />
                                                            ) : (
                                                                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">
                                                                        N/A
                                                                  </div>
                                                            )}
                                                      </td>
                                                      <td className="py-3 px-4 border-b font-medium">
                                                            {item.fullName}
                                                      </td>
                                                      <td className="py-3 px-4 border-b">
                                                            {item.poste}
                                                      </td>
                                                      <td className="py-3 px-4 border-b text-gray-700">
                                                            {item.message.slice(0, 20)}
                                                      </td>
                                                      <td className="py-3 px-4 border-b text-sm text-gray-500">
                                                            {new Date(
                                                                  item.createAt
                                                            ).toLocaleDateString()}
                                                      </td>
                                                      <td className="py-3 px-4 border-b text-sm text-gray-500">
                                                            <button
                                                                  className="text-red-600 hover:text-red-800"
                                                                  onClick={() =>
                                                                        handleDeleteClick(item.id)
                                                                  }
                                                            >
                                                                  <i className="far fa-trash-can"></i>
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>

                                    {/* Modal de confirmation */}
                                    <ConfirmDeleteModal
                                          isOpen={modalOpen}
                                          onClose={() => setModalOpen(false)}
                                          loading={loading}
                                          onConfirm={handleConfirmDelete}
                                          title="Suppression d’un article"
                                          message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                                    />
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default TestimonialList;
