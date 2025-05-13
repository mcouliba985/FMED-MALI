import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';

const AddArticleForm = () => {
      const [formData, setFormData] = useState({
            title: '',
            category: '',
            date: '',
            accroche: '',
            content: '',
            image: null,
      });

      const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: files ? files[0] : value,
            }));
      };

      const [errors, setErrors] = useState({});

      const validate = () => {
            const newErrors = {};
            if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
            if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
            if (!formData.date.trim()) newErrors.date = 'La date est requise';
            if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';
            return newErrors;
      };

      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();

            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
            }

            const informations = {
                  title: formData.title,
                  hook: formData.accroche,
                  content: formData.content,
                  category: formData.category,
                  status: 'brouillon',
                  archive: false,
                  type: 'FMED',
            };

            const dataToSend = new FormData();
            dataToSend.append('informations', JSON.stringify(informations));
            if (formData.image) {
                  dataToSend.append('source', formData.image);
            }

            try {
                  const response = await fetch(API_ENDPOINTS.createArticle, {
                        method: 'POST',
                        body: dataToSend,
                  });

                  const result = await response.json();

                  if (response.ok) {
                        const articleID = result.id;
                        // Réinitialiser le formulaire si nécessaire
                        setFormData({
                              title: '',
                              category: '',
                              date: '',
                              accroche: '',
                              content: '',
                              image: null,
                        });
                        setErrors({});
                        // Redirection vers la page de preview
                        navigate(`/admin/preview-article/${articleID}`);
                  } else {
                        alert(`Erreur : ${result.message}`);
                  }
            } catch (error) {
                  console.error('Erreur réseau :', error);
                  alert('Une erreur est survenue lors de la soumission.');
            }
      };

      return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl mx-auto text-sm">
                  {/* Titre + description */}
                  <div>
                        <h2 className="text-xl font-bold mb-1">Ajouter un nouveau article</h2>
                        <p className="text-gray-600">
                              Tous les articles en un seul endroit. Vous pouvez consulter, ajouter
                              ou archiver chaque publication.
                        </p>
                  </div>

                  {/* Image + champs de droite */}
                  <div className="flex gap-6">
                        {/* Upload d’image */}
                        <label className="flex-1 h-72 border border-gray-300 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                              {formData.image ? (
                                    <img
                                          src={URL.createObjectURL(formData.image)}
                                          alt="Preview"
                                          className="h-full object-cover rounded-xl"
                                    />
                              ) : (
                                    <>
                                          <span className="text-yellow-500 text-4xl">
                                                <i class="fas fa-cloud-arrow-down"></i>
                                          </span>
                                          <p className="font-semibold mt-2">Importez votre image</p>
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

                        {/* Titre / catégorie / date / accroche */}
                        <div className="flex-1 flex flex-col gap-3">
                              <input
                                    type="text"
                                    name="title"
                                    placeholder="Titre"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={`border rounded px-3 py-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                              />
                              {errors.title && (
                                    <p className="text-red-500 text-xs">{errors.title}</p>
                              )}

                              <div className="flex gap-2">
                                    <input
                                          type="text"
                                          name="category"
                                          placeholder="Catégorie"
                                          value={formData.category}
                                          onChange={handleChange}
                                          className={`flex-1 border rounded px-3 py-2 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <input
                                          type="date"
                                          name="date"
                                          value={formData.date}
                                          onChange={handleChange}
                                          className={`flex-1 border rounded px-3 py-2 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                              </div>
                              {(errors.category || errors.date) && (
                                    <div className="text-red-500 text-xs flex justify-between">
                                          <span>{errors.category}</span>
                                          <span>{errors.date}</span>
                                    </div>
                              )}

                              <textarea
                                    name="accroche"
                                    placeholder="Accroche captivant de l’article"
                                    value={formData.accroche}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 h-44 resize-none"
                              />
                        </div>
                  </div>

                  {/* Contenu principal */}
                  <div>
                        <textarea
                              name="content"
                              placeholder="Contenus de l’article"
                              value={formData.content}
                              onChange={handleChange}
                              className={`w-full border rounded px-3 py-2 h-52 resize-none ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                  </div>

                  {/* Bouton */}
                  <div className="flex justify-end">
                        <button
                              type="submit"
                              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded"
                        >
                              Enregistrer l’article
                        </button>
                  </div>
            </form>
      );
};

export default AddArticleForm;
