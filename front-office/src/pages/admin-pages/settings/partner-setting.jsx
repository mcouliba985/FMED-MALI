import { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';

const PartnerSetting = () => {
      const [images, setImages] = useState([]);
      const [loading, setLoading] = useState(false);
      const [modifiedPartners, setModifiedPartners] = useState({});
      const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(null);
      const fileInputRef = useRef(null);

      useEffect(() => {
            const fetchPartners = async () => {
                  try {
                        const res = await fetch(API_ENDPOINTS.getPartners);
                        const data = await res.json();
                        const normalizedData = data.map((item) => ({
                              ...item,
                              fullName: item.fullName || '',
                              link: item.link || '',
                        }));
                        setImages(normalizedData);
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

                  setModifiedPartners((prev) => {
                        const updated = { ...prev };
                        delete updated[id];
                        return updated;
                  });
            } catch (err) {
                  console.error('Erreur lors de la suppression :', err);
            }
      };

      const handleSave = async () => {
            const updates = Object.entries(modifiedPartners);
            setLoading(true);

            for (const [id, data] of updates) {
                  const formData = new FormData();
                  formData.append('fullName', data.fullName || '');
                  formData.append('link', data.link || '');
                  if (data.logo instanceof File) {
                        formData.append('logo', data.logo);
                  }

                  try {
                        const response = await fetch(`${API_ENDPOINTS.getPartners}/update/${id}`, {
                              method: 'POST',
                              body: formData,
                        });

                        if (!response.ok) throw new Error(`Erreur pour le partenaire ${id}`);

                        const updatedPartner = await response.json();

                        setImages((prevImages) =>
                              prevImages.map((img) =>
                                    img.id === updatedPartner.id ? updatedPartner : img
                              )
                        );
                  } catch (err) {
                        console.error('Erreur lors de la mise à jour :', err);
                  }
            }

            setModifiedPartners({});
            setLoading(false);
      };

      const selectedPartnerId = images[selectedPartnerIndex]?.id;
      const currentPartner = modifiedPartners[selectedPartnerId] || {};

      return (
            <section>
                  <div className="bg-gray-50 p-6 rounded-xl border space-y-6">
                        <h2 className="text-xl font-bold mb-2">Partenaires</h2>
                        <p className="text-gray-500 mb-4">Images</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {images.map((img, index) => (
                                    <div
                                          key={img.id}
                                          onClick={() => {
                                                setSelectedPartnerIndex(index);
                                                setModifiedPartners((prev) => {
                                                      if (prev[img.id]) return prev;
                                                      return {
                                                            ...prev,
                                                            [img.id]: {
                                                                  fullName: img.fullName,
                                                                  link: img.link,
                                                            },
                                                      };
                                                });
                                          }}
                                          className={`relative w-full aspect-square rounded-lg overflow-hidden border group cursor-pointer ${
                                                selectedPartnerIndex === index
                                                      ? 'ring-2 ring-green-500'
                                                      : ''
                                          }`}
                                    >
                                          <img
                                                src={img.logoPath}
                                                alt="partner"
                                                className="object-cover w-full h-full"
                                          />
                                          <button
                                                onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDeleteImage(img.id);
                                                }}
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

                  {selectedPartnerId && (
                        <div className="mt-4 bg-gray-50 p-6 rounded-xl border space-y-6">
                              <h2 className="text-xl font-bold mb-2">Informations</h2>

                              <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                          <label>Nom de l'entreprise</label>
                                          <input
                                                type="text"
                                                className="w-1/2 border rounded-md p-3 text-sm"
                                                maxLength={76}
                                                placeholder="Nom de l'entreprise"
                                                value={
                                                      currentPartner.fullName ??
                                                      images[selectedPartnerIndex]?.fullName ??
                                                      ''
                                                }
                                                onChange={(e) =>
                                                      setModifiedPartners((prev) => ({
                                                            ...prev,
                                                            [selectedPartnerId]: {
                                                                  ...prev[selectedPartnerId],
                                                                  fullName: e.target.value,
                                                            },
                                                      }))
                                                }
                                          />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                          <label>Lien du site</label>
                                          <input
                                                type="text"
                                                className="w-1/2 border rounded-md p-3 text-sm"
                                                maxLength={76}
                                                placeholder="Lien du site"
                                                value={
                                                      currentPartner.link ??
                                                      images[selectedPartnerIndex]?.link ??
                                                      ''
                                                }
                                                onChange={(e) =>
                                                      setModifiedPartners((prev) => ({
                                                            ...prev,
                                                            [selectedPartnerId]: {
                                                                  ...prev[selectedPartnerId],
                                                                  link: e.target.value,
                                                            },
                                                      }))
                                                }
                                          />
                                    </div>
                              </div>

                              <div className="text-left">
                                    <button
                                          onClick={handleSave}
                                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full shadow"
                                    >
                                          {loading ? (
                                                <>
                                                      <Loader size={5} color="black" />
                                                </>
                                          ) : (
                                                'Enregistrer'
                                          )}
                                    </button>
                              </div>
                        </div>
                  )}
            </section>
      );
};

export default PartnerSetting;
