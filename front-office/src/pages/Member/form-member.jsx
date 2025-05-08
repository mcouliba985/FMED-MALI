import { useState } from 'react';
import Main from './../../layouts/Main/Main';
import CoverPageComponent from '../../components/main/cover-page-component';

const FormMember = () => {
      const [formData, setFormData] = useState({
            type: 'particulier',
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            adresse: '',
            frequence: '',
            paiement: '',
            profession: '',
            naissance: '',
            motivation: '',
            fichier: null,
      });

      const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            if (type === 'file') {
                  setFormData({ ...formData, fichier: files[0] });
            } else {
                  setFormData({ ...formData, [name]: value });
            }
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            // Logique d’envoi ici
            console.log(formData);
      };

      const coverContent = {
            title: 'Formulaire Fonsej',
            show: true,
            label: 'Envoyer votre candidature FONSEJ.',
            hook: 'Vous souhaitez bénéficier du programme FONSEJ ? Remplissez le formulaire et envoyez votre candidature en quelques clics.',
      };

      return (
            <Main>
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
                              className="p-8 bg-white shadow-lg mb-8
                              space-y-4 max-w-3xl mx-auto"
                        >
                              <h2 className="text-2xl font-bold">Remplir le formulaire</h2>
                              <p className="text-sm text-gray-600">
                                    Vos informations personnelle ne sera pas publiée. Les champs
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
                                          { name: 'prenom', placeholder: 'Prenom', required: true },
                                          { name: 'nom', placeholder: 'Nom', required: true },
                                          { name: 'email', placeholder: 'Email', required: true },
                                          {
                                                name: 'telephone',
                                                placeholder: 'Telephone',
                                                required: true,
                                          },
                                          {
                                                name: 'adresse',
                                                placeholder: 'Adresse physique',
                                                required: true,
                                          },
                                          { name: 'frequence', placeholder: 'Fréquence du don' },
                                          {
                                                name: 'paiement',
                                                placeholder: 'Moyen de paiement préféré',
                                          },
                                          { name: 'profession', placeholder: 'Profession' },
                                          { name: 'naissance', placeholder: 'Date de naissance' },
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
                                          htmlFor="fichier"
                                          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer shadow"
                                    >
                                          Choisir un fichier
                                    </label>
                                    <span className="text-black">
                                          {formData.fichier
                                                ? formData.fichier.name
                                                : 'Aucune fichier choisi'}
                                    </span>
                                    <input
                                          type="file"
                                          id="fichier"
                                          name="fichier"
                                          onChange={handleChange}
                                          className="hidden"
                                    />
                              </div>

                              {/* Bouton envoyer */}
                              <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded-xl shadow font-semibold"
                              >
                                    Envoyer
                              </button>
                        </form>
                  </section>
            </Main>
      );
};

export default FormMember;
