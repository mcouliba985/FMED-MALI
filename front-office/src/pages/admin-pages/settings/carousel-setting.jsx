import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Modal from '../../../components/main/modal';

const CarouselSetting = () => {
      const [slides, setSlides] = useState([]);
      const [modifiedSlides, setModifiedSlides] = useState({});

      useEffect(() => {
            async function slideFunc() {
                  try {
                        const fetchRequest = await fetch(`${API_ENDPOINTS.getCarouselElement}`);
                        const data = await fetchRequest.json();
                        setSlides(data);
                  } catch (error) {
                        console.log(error);
                  }
            }

            slideFunc();
      }, []);

      const [showModal, setShowModal] = useState(false);

      const [selectedIndex, setSelectedIndex] = useState(0);

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  const updatedSlides = [...slides];
                  const newImageUrl = URL.createObjectURL(file);
                  updatedSlides[selectedIndex].imagePath = newImageUrl;

                  setSlides(updatedSlides);

                  // Enregistrer la modification en mémoire
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
            updatedSlides[selectedIndex].text = e.target.value;
            setSlides(updatedSlides);

            setModifiedSlides((prev) => ({
                  ...prev,
                  [updatedSlides[selectedIndex].id]: {
                        ...prev[updatedSlides[selectedIndex].id],
                        text: e.target.value,
                  },
            }));
      };

      const handleSave = async () => {
            for (const [id, changes] of Object.entries(modifiedSlides)) {
                  const formData = new FormData();

                  if (changes.text) {
                        formData.append('text', changes.text);
                  }
                  if (changes.image) {
                        formData.append('image', changes.image);
                  }

                  // Pour debug
                  for (let [key, value] of formData.entries()) {
                        console.log(`${key}:`, value);
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
                        } else {
                              const updatedSlide = await response.json();
                              console.log(`Slide ${id} mis à jour :`, updatedSlide);
                        }
                  } catch (error) {
                        console.error(`Erreur réseau pour le slide ${id} :`, error);
                  }
            }

            setModifiedSlides({});
            setShowModal(true);
      };

      if (slides === undefined) return null;

      return (
            <section>
                  <section className="bg-gray-50 p-6 rounded-xl border space-y-6">
                        <h2 className="text-xl font-semibold mb-2">Carrousel</h2>

                        {/* Images */}
                        <div>
                              <h3 className="font-medium mb-2">Images</h3>
                              <div className="flex gap-4 overflow-x-auto">
                                    {slides.map((slide, index) => (
                                          <div
                                                key={index}
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
                                    Texte du Slide {selectedIndex + 1}
                              </h3>
                              <p className="mb-2">entrer un accroche court</p>
                              {slides[selectedIndex] && (
                                    <textarea
                                          className="w-full border rounded-md p-3 text-sm"
                                          rows="3"
                                          maxLength={76}
                                          value={slides[selectedIndex].text}
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
                                    Enregistrer
                              </button>
                        </div>
                  </section>

                  <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title="Succès"
                        message="Votre mise à jour a ete apporte avec succès !"
                  />
            </section>
      );
};

export default CarouselSetting;
