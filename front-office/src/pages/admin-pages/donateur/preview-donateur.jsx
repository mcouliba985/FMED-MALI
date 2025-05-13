import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';

const DonateurPreview = () => {
      const { donatorID } = useParams();
      const id = parseInt(donatorID);
      const [donator, setDonator] = useState({});

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
                  <div className="bg-white rounded-xl py-6 px-2">
                        <h2 className="text-xl font-semibold mb-1">Donateur details</h2>
                        <p className="text-sm text-gray-600">
                              Consultez ici toutes les informations détaillées concernant ce
                              donateur et ses contributions.
                        </p>
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
            </div>
      );
};

export default DonateurPreview;
