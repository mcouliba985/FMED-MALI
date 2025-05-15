import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';
import { CATEGORIES_ENUM } from '../../../datas/constants';

const EditArticleForm = () => {
      const { id } = useParams(); // ID depuis l'URL
      const [loading, setLoading] = useState(true);
      const [errors, setErrors] = useState({});

      const [formData, setFormData] = useState({
            title: '',
            category: '',
            date: '',
            accroche: '',
            content: '',
            image: null,
      });

      const navigate = useNavigate();

      useEffect(() => {
            const fetchArticle = async () => {
                  try {
                        const response = await fetch(`${API_ENDPOINTS.getArticles}/${id}`);
                        const data = await response.json();

                        setFormData({
                              title: data.title || '',
                              category: data.category || '',
                              date: data.date ? data.date.substring(0, 10) : '',
                              accroche: data.hook || '',
                              content: data.content || '',
                              image: null,
                              imageUrl: data.imagePath || '', // Assure-toi que ton backend envoie bien cette clé
                        });
                  } catch (error) {
                        console.error('Erreur lors du chargement de l’article', error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchArticle();
      }, [id]);

      const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: files ? files[0] : value,
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const informations = {
                  title: formData.title,
                  hook: formData.accroche,
                  content: formData.content,
                  category: formData.category,
                  date: formData.date,
                  status: 'brouillon',
                  archive: false,
                  type: 'FMED',
            };

            const dataToSend = new FormData();
            dataToSend.append('informations', JSON.stringify(informations));

            // Ajouter l'image seulement si elle a été modifiée
            if (formData.image instanceof File) {
                  dataToSend.append('source', formData.image);
            }

            try {
                  const response = await fetch(`${API_ENDPOINTS.getArticles}/edit/${id}`, {
                        method: 'POST', // REST ne recommande pas POST pour update, mais OK ici car Symfony l'attend
                        body: dataToSend,
                  });

                  const result = await response.json();

                  if (response.ok) {
                        setErrors({});
                        navigate(`/admin/preview-article/${id}`);
                  } else {
                        alert(`Erreur : ${result.message}`);
                        setErrors(result.errors || {});
                  }
            } catch (error) {
                  console.error('Erreur réseau :', error);
                  alert('Une erreur est survenue lors de la soumission.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl mx-auto text-sm">
                  {/* Titre + description */}
                  <div>
                        <h2 className="text-xl font-bold mb-1">Modifier l'article</h2>
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
                              ) : formData.imageUrl ? (
                                    <img
                                          src={formData.imageUrl}
                                          alt={'alel'}
                                          className="h-full object-cover rounded-xl"
                                    />
                              ) : (
                                    <>
                                          <span className="text-yellow-500 text-4xl">
                                                <i className="fas fa-cloud-arrow-down"></i>
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
                                    <select
                                          name="category"
                                          value={formData.category}
                                          onChange={handleChange}
                                          className={`flex-1 border rounded px-3 py-2 bg-white ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                          <option value="">-- Sélectionnez une catégorie --</option>
                                          {CATEGORIES_ENUM.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                      {cat.label}
                                                </option>
                                          ))}
                                    </select>

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
                  </div>

                  {/* Bouton */}
                  <div className="flex justify-end">
                        <button
                              type="submit"
                              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded flex items-center justify-center gap-2 min-w-[180px]"
                              disabled={loading}
                        >
                              {loading ? (
                                    <>
                                          <Loader size={5} color="black" />
                                          <span>Enregistrement...</span>
                                    </>
                              ) : (
                                    'Enregistrer l’article'
                              )}
                        </button>
                  </div>
            </form>
      );
};

export default EditArticleForm;
