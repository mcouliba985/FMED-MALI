import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import Loader from './loader-component';

const AideForm = () => {
      const [loading, setLoading] = useState(false);

      const [formData, setFormData] = useState({
            nom: '',
            prenom: '',
            fichier: null,
      });

      const [message, setMessage] = useState('');
      const [isError, setIsError] = useState(false);

      const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData({
                  ...formData,
                  [name]: files ? files[0] : value,
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const data = new FormData();
            data.append('name', formData.nom);
            data.append('firstName', formData.prenom);
            data.append('file', formData.fichier);

            console.log(data);
            setLoading(true);

            try {
                  const response = await fetch(API_ENDPOINTS.fonsejSubmit, {
                        method: 'POST',
                        body: data,
                  });

                  const result = await response.json();

                  if (!response.ok) {
                        setIsError(true);
                        setMessage(result.message || 'Erreur lors de l’envoi du formulaire.');
                        return;
                  }

                  setIsError(false);
                  setMessage('Votre candidature a bien été envoyée !');

                  // Reset du formulaire
                  setFormData({
                        nom: '',
                        prenom: '',
                        fichier: null,
                  });
            } catch (error) {
                  setIsError(true);
                  setMessage("Une erreur s'est produite. Veuillez réessayer.");
                  console.error(error);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="max-w-xl mx-auto mt-10 p-4 lg:p-16 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-start mb-6">
                        Aider les enfants à sortir de la pauvreté
                  </h2>

                  {message && (
                        <div
                              className={`p-3 mb-4 rounded-xl ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                        >
                              {message}
                        </div>
                  )}

                  <p className="font-roboto">
                        Veuillez d'abord{' '}
                        <strong>télécharger et remplir la fiche de candidature FONSEJ</strong> avant
                        de remplir le formulaire.
                  </p>
                  <a
                        href="https://back.fmed.ml/public/uploads/res_telechargable/fiche_fonsej.doc"
                        className="text-gold hover:text-yellow-300 my-2 mb-4 block"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                  >
                        <i className="fas fa-file-zipper mr-2"></i> Télécharger le fichier
                  </a>

                  <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Ligne Nom + Prénom */}
                        <div className="flex flex-col md:flex-row gap-4">
                              <div className="w-full md:w-1/2">
                                    <input
                                          type="text"
                                          name="nom"
                                          placeholder="Nom"
                                          value={formData.nom}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                          required
                                    />
                              </div>

                              <div className="w-full md:w-1/2">
                                    <input
                                          type="text"
                                          name="prenom"
                                          placeholder="Prénom"
                                          value={formData.prenom}
                                          onChange={handleChange}
                                          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                          required
                                    />
                              </div>
                        </div>

                        {/* Champ fichier */}
                        <div className="w-full">
                              <p className="font-roboto text-sm text-red-500 mb-4">
                                    Remarque : Après avoir rempli la fiche de candidature FONSEJ,
                                    veuillez nous la renvoyer en l’important ci-dessous, puis
                                    renseignez votre nom et prénom.
                              </p>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label
                                          htmlFor="fichier"
                                          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer shadow"
                                    >
                                          Importer votre fiche de condidature FONSEJ
                                    </label>

                                    <span className="text-black break-all">
                                          {formData.fichier
                                                ? formData.fichier.name
                                                : 'Aucun fichier choisi'}
                                    </span>
                              </div>

                              <input
                                    type="file"
                                    id="fichier"
                                    name="fichier"
                                    onChange={handleChange}
                                    className="hidden"
                                    required
                              />
                        </div>

                        {/* Bouton Envoyer */}
                        <div className="flex">
                              <button
                                    type="submit"
                                    className="py-2 px-12 bg-gold text-black font-semibold rounded-xl shadow-md hover:bg-yellow-300 transition"
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                          </>
                                    ) : (
                                          'Envoyer'
                                    )}
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default AideForm;
