import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Modal from '../../../components/main/modal';
import Loader from '../../../components/main/loader-component';

const CarouselSetting = () => {
      const [slides, setSlides] = useState([]);
      const [modifiedSlides, setModifiedSlides] = useState({});
      const [showModal, setShowModal] = useState(false);
      const [loading, setLoading] = useState(false);
      const [selectedIndex, setSelectedIndex] = useState(0);
      const [lang, setLang] = useState('fr'); // langue affichée

      useEffect(() => {
            async function slideFunc() {
                  try {
                        const fetchRequest = await fetch(`${API_ENDPOINTS.getCarouselElement}`);
                        const data = await fetchRequest.json();
                        if (Array.isArray(data)) {
                              setSlides(data);
                              console.log(data);
                        } else {
                              console.warn('Format inattendu reçu :', data);
                        }
                  } catch (error) {
                        console.log(error);
                  }
            }
            slideFunc();
      }, []);

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  const updatedSlides = [...slides];
                  const newImageUrl = URL.createObjectURL(file);
                  updatedSlides[selectedIndex].imagePath = newImageUrl;

                  setSlides(updatedSlides);
                  setModifiedSlides((prev) => ({
                        ...prev,
                        [updatedSlides[selectedIndex].id]: {
                              ...prev[updatedSlides[selectedIndex].id],
                              image: file,
                        },
                  }));
            }
      };

      const handleTextChange = (e) => {
            const updatedSlides = [...slides];
            if (!updatedSlides[selectedIndex].text) {
                  updatedSlides[selectedIndex].text = {};
            }
            updatedSlides[selectedIndex].text[lang] = e.target.value;
            setSlides(updatedSlides);

            setModifiedSlides((prev) => ({
                  ...prev,
                  [updatedSlides[selectedIndex].id]: {
                        ...prev[updatedSlides[selectedIndex].id],
                        text: updatedSlides[selectedIndex].text, // on stocke tout l'objet text
                  },
            }));
      };

      const handleSave = async () => {
            setLoading(true);
            for (const [id, changes] of Object.entries(modifiedSlides)) {
                  const formData = new FormData();

                  // Trouve le slide complet pour récupérer tout l'objet text (fr+en)
                  const slide = slides.find((s) => s.id.toString() === id.toString());
                  if (slide && slide.text) {
                        formData.append('text', JSON.stringify(slide.text));
                  }

                  if (changes.image) {
                        formData.append('image', changes.image);
                  }

                  try {
                        const response = await fetch(
                              `${API_ENDPOINTS.getCarouselElement}/update/${id}`,
                              {
                                    method: 'POST',
                                    body: formData,
                              }
                        );

                        if (!response.ok) {
                              const errorData = await response.json();
                              console.error(`Erreur pour le slide ${id} :`, errorData.message);
                        }
                  } catch (error) {
                        console.error(`Erreur réseau pour le slide ${id} :`, error);
                  }
            }
            setModifiedSlides({});
            setShowModal(true);
            setLoading(false);
      };

      if (!slides.length) return null;

      return (
            <section>
                  <section className="bg-gray-50 p-6 rounded-xl border space-y-6">
                        <h2 className="text-xl font-semibold mb-2">Carrousel</h2>

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

                        {/* Images */}
                        <div>
                              <h3 className="font-medium mb-2">Images</h3>
                              <div className="flex gap-4 overflow-x-auto">
                                    {slides.map((slide, index) => (
                                          <div
                                                key={slide.id}
                                                className={`relative w-24 h-24 rounded overflow-hidden border shadow-sm cursor-pointer ${
                                                      index === selectedIndex
                                                            ? 'ring-2 ring-green-500'
                                                            : ''
                                                }`}
                                                onClick={() => setSelectedIndex(index)}
                                          >
                                                <img
                                                      src={slide.imagePath}
                                                      alt={`slide ${index}`}
                                                      className="w-full h-full object-cover"
                                                />
                                                <label className="absolute top-1 right-1 text-xs bg-yellow-300 text-black rounded px-1 shadow cursor-pointer">
                                                      ✎
                                                      <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                      />
                                                </label>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Texte du slide sélectionné */}
                        <div>
                              <h3 className="font-medium mb-1">
                                    Texte du Slide {selectedIndex + 1} ({lang.toUpperCase()})
                              </h3>
                              <p className="mb-2">Entrez un accroche court</p>
                              {slides[selectedIndex] && (
                                    <textarea
                                          className="w-full border rounded-md p-3 text-sm"
                                          rows="3"
                                          maxLength={76}
                                          value={slides[selectedIndex].text?.[lang] || ''}
                                          onChange={handleTextChange}
                                    />
                              )}
                        </div>

                        {/* Enregistrer */}
                        <div className="text-right">
                              <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow"
                              >
                                    {loading ? <Loader size={5} color="black" /> : 'Enregistrer'}
                              </button>
                        </div>
                  </section>

                  <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title="Succès"
                        message="Votre mise à jour a été apportée avec succès !"
                  />
            </section>
      );
};

export default CarouselSetting;
