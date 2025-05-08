import React, { useState } from 'react';

const AideForm = () => {
      const [formData, setFormData] = useState({
            nom: '',
            prenom: '',
            fichier: null,
      });

      const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData({
                  ...formData,
                  [name]: files ? files[0] : value,
            });
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            // Traitement du formulaire ici
            console.log(formData);
      };

      return (
            <div className="max-w-xl mx-auto mt-10 p-4 lg:p-16 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-start mb-6">
                        Aider les enfants à sortir de la pauvreté
                  </h2>
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
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label
                                          htmlFor="fichier"
                                          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer shadow"
                                    >
                                          Choisir un fichier
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
                                    Envoyer
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default AideForm;
