import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import ConfirmDeleteModal from '../../../components/main/confirm-delete-modal';

const DonateurPreview = () => {
      const { donatorID } = useParams();
      const id = parseInt(donatorID);
      const [donator, setDonator] = useState({});

      const [modalOpen, setModalOpen] = useState(false);
      const [selectedId, setSelectedId] = useState(null);
      const [loading, setLoading] = useState(false);

      const navigate = useNavigate();

      // Ouvre le modal
      const handleDeleteClick = (id) => {
            setSelectedId(id);
            setModalOpen(true);
      };

      // Confirmer la suppression
      const handleConfirmDelete = async () => {
            setLoading(true);

            try {
                  await fetch(`${API_ENDPOINTS.getDonators}/delete/${selectedId}`, {
                        method: 'DELETE',
                  });
                  // TODO : Mettre à jour la liste après suppression
            } catch (error) {
                  console.error('Erreur lors de la suppression :', error);
            } finally {
                  setModalOpen(false);
                  setSelectedId(null);
                  setLoading(true);
                  navigate('/admin/list-donateur');
            }
      };

      useEffect(() => {
            async function donatorFunc() {
                  try {
                        const fetchRequest = await fetch(`${API_ENDPOINTS.getDonators}/${id}`);
                        const response = await fetchRequest.json();
                        setDonator(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            donatorFunc();
      }, [id]);

      if (donator === undefined) return null;

      return (
            <div className="min-h-screen">
                  <div className="flex justify-between bg-white rounded-xl py-6 px-2">
                        <div>
                              <h2 className="text-xl font-semibold mb-1">Donateur details</h2>
                              <p className="text-sm text-gray-600">
                                    Consultez ici toutes les informations détaillées concernant ce
                                    donateur et ses contributions.
                              </p>
                        </div>

                        <button
                              className="text-red-600 text-3xl cursor-pointer hover:text-red-800"
                              onClick={() => handleDeleteClick(donatorID)}
                        >
                              <i class="far fa-trash-can"></i>
                        </button>
                  </div>
                  <div className="max-w-4xl bg-gray-100 rounded-2xl shadow-md p-6 space-y-6">
                        <div className="flex justify-between items-start">
                              <div>
                                    <h1 className="text-lg font-semibold">
                                          {donator.firstName} {donator.ladtName}
                                    </h1>
                                    <p className="text-red-500 text-sm">{donator.type}</p>
                                    <p className="text-sm">{donator.address}</p>
                                    <p className="text-sm">{donator.email}</p>
                                    <p className="text-sm">{donator.phone}</p>
                                    <p className="text-sm">
                                          {new Date(donator.createAt).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                          })}
                                    </p>
                              </div>
                              <div className="text-right">
                                    <h1 className="text-xl font-bold">
                                          FMED <span className="text-yellow-500">MALI</span>
                                    </h1>
                                    <p className="text-sm">
                                          Agir ensemble pour un avenir solidaire
                                    </p>
                                    <p className="text-sm">
                                          Siège social : Hamdallaye ACI
                                          <br />
                                          Immeuble Alfarouk non loin de CANAL+
                                    </p>
                              </div>
                        </div>

                        <div>
                              <h2 className="text-lg font-semibold">Lettre de motivation</h2>
                              <p className="text-sm text-gray-700 mt-2">{donator.motivation}</p>
                        </div>

                        <div>
                              <h2 className="text-lg font-semibold">Recapitulatif des dons</h2>
                              <p className="text-sm text-gray-700">
                                    frequence du dons :{' '}
                                    <span className="font-medium">{donator.donationFrequency}</span>
                              </p>
                              <p className="text-sm text-gray-700 mb-4">
                                    Moyen de paiement :{' '}
                                    <span className="font-medium">{donator.paymentMethod}</span>
                              </p>
                              <a
                                    href={donator.filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
                              >
                                    Piece d'identité
                              </a>
                        </div>

                        <div>
                              <h2 className="text-lg font-semibold">Historique & Suivi des dons</h2>
                              <div className="mt-2 bg-gray-200">
                                    <div className="py-6 text-center text-sm font-medium text-gray-600">
                                          Aucune données pour les moments
                                    </div>
                              </div>
                        </div>

                        <div className="hidden justify-end gap-4 pt-4">
                              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                    Approuver
                              </button>
                              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                    Rejeter
                              </button>
                        </div>
                  </div>

                  {/* Modal de confirmation */}
                  <ConfirmDeleteModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        loading={loading}
                        onConfirm={handleConfirmDelete}
                        title="Suppression d’un article"
                        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                  />
            </div>
      );
};

export default DonateurPreview;
