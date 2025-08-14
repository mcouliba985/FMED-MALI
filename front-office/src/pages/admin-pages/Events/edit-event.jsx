import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/main/loader-component';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';

const EditEventForm = () => {
      const navigate = useNavigate();
      const { eventID } = useParams();
      const [loading, setLoading] = useState(false);
      const [activeLang, setActiveLang] = useState('fr');
      const [initialImage, setInitialImage] = useState(null);

      const [formData, setFormData] = useState({
            title: { fr: '', en: '' },
            hook: { fr: '', en: '' },
            content: { fr: '', en: '' },
            category: '',
            eventDate: '',
            location: { fr: '', en: '' },
            program: [{ fr: '', en: '' }],
            latitude: '',
            longitude: '',
            image: null,
      });

      // Charger les données existantes
      useEffect(() => {
            if (!eventID) return;

            async function fetchEvent() {
                  setLoading(true);
                  try {
                        const res = await fetch(`${API_ENDPOINTS.getEvents}/${eventID}`);
                        if (!res.ok) throw new Error("Erreur lors du chargement de l'événement");
                        const data = await res.json();

                        setFormData({
                              title: data.title || { fr: '', en: '' },
                              hook: data.hook || { fr: '', en: '' },
                              content: data.content || { fr: '', en: '' },
                              category: data.category || '',
                              eventDate: data.eventDate || '',
                              location: data.location || { fr: '', en: '' },
                              program:
                                    data.program && data.program.length > 0
                                          ? data.program
                                          : [{ fr: '', en: '' }],
                              latitude: data.latitude || '',
                              longitude: data.longitude || '',
                              image: null,
                        });

                        if (data.imagePath) {
                              setInitialImage(data.imagePath);
                        }
                  } catch (err) {
                        console.error(err);
                        alert('Impossible de charger les données');
                  } finally {
                        setLoading(false);
                  }
            }

            fetchEvent();
      }, [eventID]);

      const handleChange = (e, lang = null, field = null, index = null) => {
            const { name, value, files } = e.target;
            setFormData((prev) => {
                  if (field && lang !== null) {
                        if (field === 'program' && index !== null) {
                              const updatedProgram = [...prev.program];
                              updatedProgram[index] = { ...updatedProgram[index], [lang]: value };
                              return { ...prev, program: updatedProgram };
                        }
                        return {
                              ...prev,
                              [field]: { ...prev[field], [lang]: value },
                        };
                  }
                  return {
                        ...prev,
                        [name]: files ? files[0] : value,
                  };
            });
      };

      const addProgramItem = () => {
            setFormData((prev) => ({
                  ...prev,
                  program: [...prev.program, { fr: '', en: '' }],
            }));
      };

      const removeProgramItem = (index) => {
            setFormData((prev) => ({
                  ...prev,
                  program: prev.program.filter((_, i) => i !== index),
            }));
      };

      const validate = () => {
            const newErrors = {};
            if (!formData.title.fr.trim()) newErrors.titleFr = 'Titre FR requis';
            if (!formData.title.en.trim()) newErrors.titleEn = 'Titre EN requis';
            if (!formData.hook.fr.trim()) newErrors.hookFr = 'Accroche FR requise';
            if (!formData.hook.en.trim()) newErrors.hookEn = 'Accroche EN requise';
            if (!formData.content.fr.trim()) newErrors.contentFr = 'Contenu FR requis';
            if (!formData.content.en.trim()) newErrors.contentEn = 'Contenu EN requis';
            if (!formData.category.trim()) newErrors.category = 'Catégorie requise';
            if (!formData.eventDate.trim()) newErrors.eventDate = 'Date requise';
            if (!formData.location.fr.trim()) newErrors.locationFr = 'Lieu FR requis';
            if (!formData.location.en.trim()) newErrors.locationEn = 'Lieu EN requis';
            if (!formData.latitude || !formData.longitude)
                  newErrors.coords = 'Coordonnées requises';
            return newErrors;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setLoading(false);
                  return;
            }

            const informations = {
                  title: formData.title,
                  hook: formData.hook,
                  content: formData.content,
                  category: formData.category,
                  eventDate: formData.eventDate,
                  location: formData.location,
                  program: formData.program,
                  latitude: parseFloat(formData.latitude),
                  longitude: parseFloat(formData.longitude),
            };

            const dataToSend = new FormData();
            dataToSend.append('informations', JSON.stringify(informations));
            if (formData.image) {
                  dataToSend.append('image', formData.image);
            }

            try {
                  const response = await fetch(`${API_ENDPOINTS.editEvents}/${eventID}`, {
                        method: 'POST',
                        body: dataToSend,
                  });

                  const result = await response.json();
                  if (response.ok) {
                        navigate(`/admin/preview-event/${eventID}`);
                  } else {
                        alert(`Erreur : ${result.message}`);
                  }
            } catch (error) {
                  console.error('Erreur réseau :', error);
                  alert('Une erreur est survenue.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form
                  onSubmit={handleSubmit}
                  className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl"
            >
                  <h2 className="text-2xl font-bold mb-6">Modifier l'événement</h2>

                  {/* Sélecteur de langue */}
                  <div className="flex gap-3 mb-6">
                        {['fr', 'en'].map((lang) => (
                              <button
                                    type="button"
                                    key={lang}
                                    onClick={() => setActiveLang(lang)}
                                    className={`px-4 py-2 rounded ${
                                          activeLang === lang
                                                ? 'bg-yellow-400 font-bold'
                                                : 'bg-gray-200 text-gray-600'
                                    }`}
                              >
                                    {lang.toUpperCase()}
                              </button>
                        ))}
                  </div>

                  {/* Image Upload */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                              <label className="w-full h-60 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 transition">
                                    {formData.image ? (
                                          <img
                                                src={URL.createObjectURL(formData.image)}
                                                alt="Preview"
                                                className="h-full w-full object-cover rounded-xl"
                                          />
                                    ) : initialImage ? (
                                          <img
                                                src={initialImage}
                                                alt="actuelle"
                                                className="h-full w-full object-cover rounded-xl"
                                          />
                                    ) : (
                                          <>
                                                <span className="text-4xl text-yellow-500">
                                                      <i className="fas fa-cloud-upload-alt"></i>
                                                </span>
                                                <p>Glissez ou importez une image</p>
                                          </>
                                    )}
                                    <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleChange}
                                          name="image"
                                          className="hidden"
                                    />
                              </label>
                        </div>

                        {/* Champs texte principaux */}
                        <div className="flex flex-col gap-4">
                              <input
                                    type="text"
                                    placeholder={`Titre (${activeLang.toUpperCase()})`}
                                    value={formData.title[activeLang]}
                                    onChange={(e) => handleChange(e, activeLang, 'title')}
                                    className="border rounded px-3 py-2"
                              />
                              <input
                                    type="text"
                                    placeholder={`Accroche (${activeLang.toUpperCase()})`}
                                    value={formData.hook[activeLang]}
                                    onChange={(e) => handleChange(e, activeLang, 'hook')}
                                    className="border rounded px-3 py-2"
                              />
                              <textarea
                                    placeholder={`Description (${activeLang.toUpperCase()})`}
                                    value={formData.content[activeLang]}
                                    onChange={(e) => handleChange(e, activeLang, 'content')}
                                    className="border rounded px-3 py-2 h-28 resize-none"
                              />
                        </div>
                  </div>

                  {/* Autres champs */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                        <input
                              type="text"
                              name="category"
                              placeholder="Catégorie"
                              value={formData.category}
                              onChange={handleChange}
                              className="border rounded px-3 py-2"
                        />
                        <input
                              type="date"
                              name="eventDate"
                              value={formData.eventDate}
                              onChange={handleChange}
                              className="border rounded px-3 py-2"
                        />
                        <input
                              type="text"
                              placeholder={`Lieu (${activeLang.toUpperCase()})`}
                              value={formData.location[activeLang]}
                              onChange={(e) => handleChange(e, activeLang, 'location')}
                              className="border rounded px-3 py-2"
                        />
                  </div>

                  {/* Coordonnées */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                        <input
                              type="number"
                              step="any"
                              name="latitude"
                              placeholder="Latitude"
                              value={formData.latitude}
                              onChange={handleChange}
                              className="border rounded px-3 py-2"
                        />
                        <input
                              type="number"
                              step="any"
                              name="longitude"
                              placeholder="Longitude"
                              value={formData.longitude}
                              onChange={handleChange}
                              className="border rounded px-3 py-2"
                        />
                  </div>

                  {/* Programme */}
                  <div className="mt-6">
                        <h3 className="font-semibold mb-2">Programme</h3>
                        {formData.program.map((item, index) => (
                              <div key={index} className="flex gap-3 mb-2">
                                    <input
                                          type="text"
                                          placeholder="Programme FR"
                                          value={item.fr}
                                          onChange={(e) => handleChange(e, 'fr', 'program', index)}
                                          className="border rounded px-3 py-2 flex-1"
                                    />
                                    <input
                                          type="text"
                                          placeholder="Programme EN"
                                          value={item.en}
                                          onChange={(e) => handleChange(e, 'en', 'program', index)}
                                          className="border rounded px-3 py-2 flex-1"
                                    />
                                    {index > 0 && (
                                          <button
                                                type="button"
                                                onClick={() => removeProgramItem(index)}
                                                className="bg-red-500 text-white px-3 rounded"
                                          >
                                                ×
                                          </button>
                                    )}
                              </div>
                        ))}
                        <button
                              type="button"
                              onClick={addProgramItem}
                              className="bg-green-500 text-white px-4 py-1 rounded mt-2"
                        >
                              + Ajouter une étape
                        </button>
                  </div>

                  {/* Bouton submit */}
                  <div className="flex justify-end mt-6">
                        <button
                              type="submit"
                              disabled={loading}
                              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded flex items-center gap-2"
                        >
                              {loading ? (
                                    <>
                                          <Loader size={5} color="black" />
                                          <span>Enregistrement...</span>
                                    </>
                              ) : (
                                    "Mettre à jour l'événement"
                              )}
                        </button>
                  </div>
            </form>
      );
};

export default EditEventForm;
