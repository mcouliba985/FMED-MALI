import { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';

const PartnerSetting = () => {
      const [images, setImages] = useState([]);
      const fileInputRef = useRef(null);

      useEffect(() => {
            const fetchPartners = async () => {
                  try {
                        const res = await fetch(API_ENDPOINTS.getPartners);
                        const data = await res.json();
                        setImages(data);
                  } catch (err) {
                        console.error('Erreur lors du chargement des partenaires :', err);
                  }
            };

            fetchPartners();
      }, []);

      const handleAddImageClick = () => {
            if (images.length < 10) {
                  fileInputRef.current.click();
            }
      };

      const handleImageChange = async (event) => {
            const file = event.target.files[0];
            if (!file || images.length >= 10) return;

            const formData = new FormData();
            formData.append('logo', file);

            try {
                  const response = await fetch(API_ENDPOINTS.addNewPartner, {
                        method: 'POST',
                        body: formData,
                  });

                  if (!response.ok) throw new Error('Upload échoué');

                  const newImage = await response.json();
                  setImages((prevImages) => [...prevImages, newImage]);
            } catch (err) {
                  console.error("Erreur lors de l'upload :", err);
            }
      };

      const handleDeleteImage = async (id) => {
            try {
                  const res = await fetch(`${API_ENDPOINTS.getPartners}/delete/${id}`, {
                        method: 'DELETE',
                  });

                  if (!res.ok) throw new Error('Suppression échouée');

                  setImages((prevImages) => prevImages.filter((img) => img.id !== id));
            } catch (err) {
                  console.error('Erreur lors de la suppression :', err);
            }
      };

      return (
            <section>
                  <div className="bg-gray-50 p-6 rounded-xl border space-y-6">
                        <h2 className="text-xl font-bold mb-2">Partenaires</h2>
                        <p className="text-gray-500 mb-4">Images</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {images.map((img) => (
                                    <div
                                          key={img.id}
                                          className="relative w-full aspect-square rounded-lg overflow-hidden border group"
                                    >
                                          <img
                                                src={img.logoPath}
                                                alt="partner"
                                                className="object-cover w-full h-full"
                                          />
                                          <button
                                                onClick={() => handleDeleteImage(img.id)}
                                                className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded px-1 shadow hover:bg-red-600"
                                                title="Supprimer"
                                          >
                                                <i className="fas fa-trash-alt text-[10px]" />
                                          </button>
                                    </div>
                              ))}

                              {images.length < 10 && (
                                    <button
                                          onClick={handleAddImageClick}
                                          className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 text-xl font-bold"
                                    >
                                          +
                                    </button>
                              )}
                        </div>

                        <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                        />
                  </div>
            </section>
      );
};

export default PartnerSetting;
