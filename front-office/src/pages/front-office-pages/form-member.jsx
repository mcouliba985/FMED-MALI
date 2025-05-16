import { useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import Modal from '../../components/main/modal';
import Loader from '../../components/main/loader-component';

const FormMember = () => {
      const [formData, setFormData] = useState({
            type: 'particulier',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            donationFrequency: '',
            paymentMethod: '',
            profession: '',
            motivation: '',
            file: null, // Utilisation de "file"
      });

      const [loading, setLoading] = useState(false);

      const [showModal, setShowModal] = useState(false);

      const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            if (type === 'file') {
                  setFormData({ ...formData, file: files[0] }); // Utilisation de "file"
            } else {
                  setFormData({ ...formData, [name]: value });
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            const form = new FormData();
            const infos = { ...formData };
            delete infos.file; // Retirer le fichier de l'objet de données

            form.append('informations', JSON.stringify(infos));
            if (formData.file) {
                  form.append('file', formData.file); // Utilisation de "file"
            }

            console.log(formData);
            try {
                  const response = await fetch(API_ENDPOINTS.createDonor, {
                        method: 'POST',
                        body: form,
                  });

                  if (response.ok) {
                        const data = await response.json();

                        setFormData({
                              type: 'particulier',
                              firstName: '',
                              lastName: '',
                              email: '',
                              phone: '',
                              address: '',
                              donationFrequency: '',
                              paymentMethod: '',
                              profession: '',
                              motivation: '',
                              file: null, // Utilisation de "file"
                        });

                        console.log('Donor created:', data);

                        setShowModal(true); // ✅ Affiche le modal
                  } else {
                        alert('Error while submitting form.');
                  }
            } catch (err) {
                  console.error(err);
                  alert('Network error.');
            } finally {
                  setLoading(false);
            }
      };

      const coverContent = {
            title: 'Devenir donateur',
            show: true,
            label: 'Besoin d’aide ou de plus d’informations ?',
            hook: 'N’hésitez pas à nous contacter pour toute question concernant votre inscription en tant que donateur. Notre équipe se fera un plaisir de vous accompagner.',
      };

      return (
            <section>
                  <CoverPageComponent
                        className="mb-4"
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />
                  <section className="container">
                        <form
                              onSubmit={handleSubmit}
                              className="p-8 bg-white shadow-lg mb-8 space-y-4 max-w-3xl mx-auto"
                        >
                              <h2 className="text-2xl font-bold">Remplir le formulaire</h2>
                              <p className="text-sm text-gray-600">
                                    Vos informations personnelles ne seront pas publiées. Les champs
                                    obligatoires sont marqués *
                              </p>

                              {/* Sélection type */}
                              <div className="flex items-center gap-6 mt-2">
                                    <label className="flex items-center gap-2">
                                          <input
                                                type="radio"
                                                name="type"
                                                value="entreprise"
                                                checked={formData.type === 'entreprise'}
                                                onChange={handleChange}
                                          />
                                          Entreprise
                                    </label>

                                    <label className="flex items-center gap-2">
                                          <input
                                                type="radio"
                                                name="type"
                                                value="particulier"
                                                checked={formData.type === 'particulier'}
                                                onChange={handleChange}
                                          />
                                          Particulier
                                    </label>
                              </div>

                              {/* Champs en grille avec fond gris et padding */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                          {
                                                name: 'firstName',
                                                placeholder: 'Prénom',
                                                required: true,
                                          },
                                          { name: 'lastName', placeholder: 'Nom', required: true },
                                          { name: 'email', placeholder: 'Email', required: true },
                                          {
                                                name: 'phone',
                                                placeholder: 'Téléphone',
                                                required: true,
                                          },
                                          {
                                                name: 'address',
                                                placeholder: 'Adresse physique',
                                                required: true,
                                          },
                                          {
                                                name: 'donationFrequency',
                                                placeholder: 'Fréquence du don',
                                          },
                                          {
                                                name: 'paymentMethod',
                                                placeholder: 'Moyen de paiement préféré',
                                          },
                                          { name: 'profession', placeholder: 'Profession' },
                                    ].map(({ name, placeholder, required }) => (
                                          <div key={name} className="bg-gray-100 p-3 rounded-xl">
                                                <input
                                                      name={name}
                                                      value={formData[name]}
                                                      onChange={handleChange}
                                                      placeholder={placeholder}
                                                      className="w-full bg-transparent outline-none"
                                                      required={required}
                                                />
                                          </div>
                                    ))}
                              </div>

                              {/* Zone de texte également stylisée */}
                              <div className="bg-gray-100 p-4 rounded-xl mt-4">
                                    <textarea
                                          name="motivation"
                                          value={formData.motivation}
                                          onChange={handleChange}
                                          placeholder="Motivation du don"
                                          className="w-full bg-transparent outline-none resize-none"
                                          rows={4}
                                    />
                              </div>

                              {/* Champ fichier personnalisé */}
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label
                                          htmlFor="file" // Utilisation de "file" ici
                                          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer shadow"
                                    >
                                          Votre piece d'identité
                                    </label>
                                    <span className="text-black">
                                          {formData.file
                                                ? formData.file.name
                                                : 'Aucun fichier choisi'}
                                    </span>
                                    <input
                                          type="file"
                                          id="file" // Utilisation de "file" ici
                                          name="file" // Utilisation de "file" ici
                                          onChange={handleChange}
                                          className="hidden"
                                    />
                              </div>

                              {/* Bouton envoyer */}
                              <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded-xl shadow font-semibold"
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                          </>
                                    ) : (
                                          'Envoyer'
                                    )}
                              </button>
                        </form>

                        <Modal
                              isOpen={showModal}
                              onClose={() => setShowModal(false)}
                              title="Succès"
                              message="Le donateur a été enregistré avec succès !"
                        />
                  </section>
            </section>
      );
};

export default FormMember;
