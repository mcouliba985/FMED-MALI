import { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Modal from '../../../components/main/modal';
import Loader from '../../../components/main/loader-component';

const YoutubeManageSetting = () => {
      const [youtube, setYoutube] = useState({});
      const [preview, setPreview] = useState(null);
      const [formData, setFormData] = useState({
            hook: { en: '', fr: '' },
            content: { en: '', fr: '' },
            youtubeLink: '',
      });
      const [lang, setLang] = useState('fr'); // <-- État pour la langue sélectionnée
      const fileInputRef = useRef(null);
      const [showModal, setShowModal] = useState(false);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            async function youtubeFunc() {
                  try {
                        const res = await fetch(`${API_ENDPOINTS.getYoutubeElement}`);
                        const data = await res.json();
                        const item = data[0];
                        setYoutube(item);
                        setFormData({
                              hook: item.hook || { en: '', fr: '' },
                              content: item.content || { en: '', fr: '' },
                              youtubeLink: item.youtubeLink || '',
                        });
                        setPreview(item.imagePath);
                  } catch (error) {
                        console.log(error);
                  }
            }
            youtubeFunc();
      }, []);

      const handleChange = (e) => {
            const { name, value } = e.target;
            if (name.startsWith('hook.') || name.startsWith('content.')) {
                  const [field, fieldLang] = name.split('.');
                  setFormData((prev) => ({
                        ...prev,
                        [field]: {
                              ...prev[field],
                              [fieldLang]: value,
                        },
                  }));
            } else {
                  setFormData((prev) => ({
                        ...prev,
                        [name]: value,
                  }));
            }
      };

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setPreview(URL.createObjectURL(file));
            }
      };

      const handleSubmit = async () => {
            setLoading(true);
            const form = new FormData();
            form.append('hook', JSON.stringify(formData.hook));
            form.append('content', JSON.stringify(formData.content));
            form.append('youtubeLink', formData.youtubeLink);

            if (fileInputRef.current.files[0]) {
                  form.append('image', fileInputRef.current.files[0]);
            }

            try {
                  const res = await fetch(
                        `${API_ENDPOINTS.getYoutubeElement}/update/${youtube.id}`,
                        {
                              method: 'POST',
                              body: form,
                        }
                  );

                  if (!res.ok) {
                        throw new Error('Erreur lors de la mise à jour.');
                  }

                  const result = await res.json();
                  console.log('Mise à jour réussie :', result);
                  setShowModal(true);
            } catch (err) {
                  console.error(err);
                  alert(err.message || 'Erreur lors de la mise à jour.');
            } finally {
                  setLoading(false);
            }
      };

      if (!youtube?.id) return null;

      return (
            <section>
                  {/* Sélecteur de langue */}
                  <div className="flex gap-2 mb-4">
                        <button
                              onClick={() => setLang('fr')}
                              className={`px-3 py-1 rounded ${
                                    lang === 'fr' ? 'bg-green-600 text-white' : 'bg-gray-200'
                              }`}
                        >
                              Français
                        </button>
                        <button
                              onClick={() => setLang('en')}
                              className={`px-3 py-1 rounded ${
                                    lang === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'
                              }`}
                        >
                              English
                        </button>
                  </div>

                  {/* Section Vidéo */}
                  <section className="bg-gray-50 p-6 rounded-xl border space-y-6">
                        <h2 className="text-xl font-semibold mb-2">Vidéo</h2>

                        <div className="flex flex-col md:flex-row gap-6">
                              {/* Aperçu image */}
                              <div className="relative w-full md:w-1/3">
                                    <img
                                          src={preview}
                                          alt={youtube.imageName}
                                          className="rounded-xl w-full h-56 object-cover border"
                                    />
                                    <label className="absolute top-2 right-2 text-xs bg-yellow-300 text-black rounded px-2 py-1 shadow cursor-pointer">
                                          ✎
                                          <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                className="hidden"
                                          />
                                    </label>
                              </div>

                              {/* Champs texte */}
                              <div className="w-full md:w-2/3 space-y-3">
                                    {/* Youtube Link */}
                                    <div>
                                          <label className="block text-sm font-medium">
                                                Lien Youtube
                                          </label>
                                          <input
                                                type="text"
                                                name="youtubeLink"
                                                value={formData.youtubeLink}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2 text-sm"
                                          />
                                    </div>

                                    {/* Accroche et Description selon la langue sélectionnée */}
                                    <div>
                                          <label className="block text-sm font-medium">
                                                Accroche ({lang.toUpperCase()})
                                          </label>
                                          <input
                                                type="text"
                                                name={`hook.${lang}`}
                                                value={formData.hook[lang]}
                                                maxLength={40}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2 text-sm"
                                          />
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium">
                                                Description ({lang.toUpperCase()})
                                          </label>
                                          <textarea
                                                name={`content.${lang}`}
                                                value={formData.content[lang]}
                                                onChange={handleChange}
                                                maxLength={235}
                                                className="w-full border rounded-md p-2 text-sm"
                                                rows="4"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Bouton Enregistrer */}
                  <div className="text-right mt-4">
                        <button
                              onClick={handleSubmit}
                              disabled={loading}
                              className={`${
                                    loading ? 'cursor-not-allowed opacity-70' : ''
                              } bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow`}
                        >
                              {loading ? <Loader size={5} color="black" /> : 'Enregistrer'}
                        </button>
                  </div>

                  <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title="Succès"
                        message="Votre mise à jour a été apportée avec succès !"
                  />
            </section>
      );
};

export default YoutubeManageSetting;
