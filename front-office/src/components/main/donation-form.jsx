import React, { useState } from 'react';

const DonationForm = () => {
      const [formData, setFormData] = useState({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            message: '',
            montant: '',
            paiement: '',
      });

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            // Envoyer les données
      };

      return (
            <form
                  onSubmit={handleSubmit}
                  className="max-w-xl mx-auto bg-white p-6 rounded-xl space-y-6 shadow-md"
            >
                  <h2 className="text-2xl font-bold">Aider les enfants à sortir de la pauvreté</h2>

                  {/* Montant du don */}
                  <div>
                        <label className="block font-semibold mb-2">Votre donation</label>
                        <div className="flex items-center gap-4 bg-gray-100 rounded-xl">
                              <div className="bg-black p-4 w-20 h-20 text-white text-center rounded-full">
                                    <i class="fas fa-hand-holding-dollar text-2xl"></i>
                              </div>
                              <input
                                    type="text"
                                    name="montant"
                                    value={formData.montant}
                                    onChange={handleChange}
                                    placeholder="Veuillez entre le montant du don à faire"
                                    className="bg-transparent w-full outline-none"
                              />
                        </div>
                  </div>

                  {/* Moyen de paiement */}
                  <div>
                        <label className="block font-semibold mb-2">Moyen de paiement</label>
                        <div className="space-y-2">
                              <label className="flex justify-between items-center gap-2">
                                    <div className="flex gap-2">
                                          <input
                                                type="radio"
                                                name="paiement"
                                                value="carte"
                                                onChange={handleChange}
                                          />
                                          Carte credit
                                    </div>
                                    <div className="flex gap-2">
                                          <img
                                                src="https://img.icons8.com/color/48/000000/visa.png"
                                                alt="visa"
                                                className="w-6"
                                          />
                                          <img
                                                src="https://img.icons8.com/color/48/000000/mastercard.png"
                                                alt="mastercard"
                                                className="w-6"
                                          />
                                    </div>
                              </label>

                              <label className="flex justify-between items-center gap-2">
                                    <div className="flex gap-2">
                                          <input
                                                type="radio"
                                                name="paiement"
                                                value="wallet"
                                                onChange={handleChange}
                                          />
                                          Portefeuille électronique
                                    </div>
                                    <div className="flex gap-2">
                                          <img
                                                src="https://img.icons8.com/color/48/000000/paypal.png"
                                                alt="paypal"
                                                className="w-6"
                                          />
                                          <img
                                                src="https://img.icons8.com/color/48/000000/stripe.png"
                                                alt="stripe"
                                                className="w-6"
                                          />
                                    </div>
                              </label>

                              <label className="flex justify-between items-center gap-2">
                                    <div className="flex gap-2">
                                          <input
                                                type="radio"
                                                name="paiement"
                                                value="wallet"
                                                onChange={handleChange}
                                          />
                                          Mobile Money
                                    </div>
                                    <div className="flex gap-2">
                                          <img
                                                src="https://otobi.sn/wp-content/uploads/2022/03/Orange-Money-logo.png"
                                                alt="paypal"
                                                className="w-6"
                                          />
                                          <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1j8_1o20igEk7AJyDYrJ_cH3dBXBr6jwuw&s"
                                                alt="stripe"
                                                className="w-6"
                                          />
                                          <img
                                                src="https://www.moov-africa.ml/PublishingImages/contenu/moov-money.png"
                                                alt="stripe"
                                                className="w-6"
                                          />
                                          <img
                                                src="https://paydunya.com/refont/images/icon_pydu/partners/wizall.png"
                                                alt="stripe"
                                                className="w-6"
                                          />
                                    </div>
                              </label>
                        </div>
                  </div>

                  {/* Coordonnées */}
                  <div>
                        <label className="block font-semibold mb-2">Details Information</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    placeholder="Nom"
                                    className="bg-gray-100 p-3 rounded-xl w-full outline-none"
                                    required
                              />
                              <input
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    placeholder="Prenom"
                                    className="bg-gray-100 p-3 rounded-xl w-full outline-none"
                                    required
                              />
                              <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="bg-gray-100 p-3 rounded-xl w-full outline-none"
                                    required
                              />
                              <input
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    placeholder="Telephone"
                                    className="bg-gray-100 p-3 rounded-xl w-full outline-none"
                                    required
                              />
                        </div>

                        {/* Message */}
                        <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Votre message"
                              rows={3}
                              className="bg-gray-100 p-3 rounded-xl w-full mt-4 outline-none resize-none"
                        />
                  </div>

                  <button
                        type="submit"
                        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-xl hover:bg-yellow-300 transition"
                  >
                        Envoyer
                  </button>
            </form>
      );
};

export default DonationForm;
