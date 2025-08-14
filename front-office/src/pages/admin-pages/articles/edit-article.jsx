import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';
import { CATEGORIES_ENUM, TYPE_ENUM } from '../../../datas/constants';

const EditArticleForm = () => {
      const { id } = useParams();
      const [loading, setLoading] = useState(true);
      const [errors, setErrors] = useState({});
      const [activeLang, setActiveLang] = useState('fr'); // langue active

      const [formData, setFormData] = useState({
            title: { fr: '', en: '' },
            category: '',
            type: '',
            date: '',
            accroche: { fr: '', en: '' },
            content: { fr: '', en: '' },
            image: null,
            imageUrl: '',
      });

      const navigate = useNavigate();

      useEffect(() => {
            const fetchArticle = async () => {
                  try {
                        const response = await fetch(`${API_ENDPOINTS.getArticles}/${id}`);
                        const data = await response.json();

                        setFormData({
                              title: {
                                    fr: data.title?.fr || '',
                                    en: data.title?.en || '',
                              },
                              category: data.category || '',
                              type: data.type || '',
                              date: data.createAt ? data.createAt.substring(0, 10) : '',
                              accroche: {
                                    fr: data.hook?.fr || '',
                                    en: data.hook?.en || '',
                              },
                              content: {
                                    fr: data.content?.fr || '',
                                    en: data.content?.en || '',
                              },
                              image: null,
                              imageUrl: data.imagePath || '',
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
            const { name, value, files, dataset } = e.target;
            const lang = dataset.lang;

            if (lang) {
                  setFormData((prev) => ({
                        ...prev,
                        [name]: {
                              ...prev[name],
                              [lang]: value,
                        },
                  }));
            } else {
                  setFormData((prev) => ({
                        ...prev,
                        [name]: files ? files[0] : value,
                  }));
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const informations = {
                  title: formData.title,
                  hook: formData.accroche,
                  content: formData.content,
                  category: formData.category,
                  type: formData.type,
                  date: formData.date,
                  status: 'brouillon',
                  archive: false,
            };

            const dataToSend = new FormData();
            dataToSend.append('informations', JSON.stringify(informations));

            if (formData.image instanceof File) {
                  dataToSend.append('source', formData.image);
            }

            try {
                  const response = await fetch(`${API_ENDPOINTS.getArticles}/edit/${id}`, {
                        method: 'POST',
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
                  <h2 className="text-xl font-bold mb-1">Modifier l'article</h2>

                  {/* Sélecteur de langue */}
                  <div className="flex gap-2 mb-4">
                        {['fr', 'en'].map((lang) => (
                              <button
                                    type="button"
                                    key={lang}
                                    onClick={() => setActiveLang(lang)}
                                    className={`px-4 py-1 rounded ${
                                          activeLang === lang
                                                ? 'bg-yellow-400 text-black font-semibold'
                                                : 'bg-gray-200 text-gray-700'
                                    }`}
                              >
                                    {lang.toUpperCase()}
                              </button>
                        ))}
                  </div>

                  <div className="flex gap-6">
                        {/* Upload image */}
                        <label className="flex-1 h-72 border border-gray-300 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                              {formData.image ? (
                                    <img
                                          src={URL.createObjectURL(formData.image)}
                                          alt="Aperçu article"
                                          className="h-full object-cover rounded-xl"
                                    />
                              ) : formData.imageUrl ? (
                                    <img
                                          src={formData.imageUrl}
                                          alt="Aperçu article existant"
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

                        {/* Champs texte */}
                        <div className="flex-1 flex flex-col gap-3">
                              <input
                                    type="text"
                                    name="title"
                                    data-lang={activeLang}
                                    placeholder={`Titre (${activeLang.toUpperCase()})`}
                                    value={formData.title[activeLang]}
                                    onChange={handleChange}
                                    className={`border rounded px-3 py-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                              />

                              <div className="flex gap-2">
                                    <select
                                          name="type"
                                          value={formData.type}
                                          onChange={handleChange}
                                          className={`flex-1 border rounded px-3 py-2 bg-white ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                          <option value="">-- type d'article --</option>
                                          {TYPE_ENUM.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                      {type.label}
                                                </option>
                                          ))}
                                    </select>
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

                              <textarea
                                    name="accroche"
                                    data-lang={activeLang}
                                    placeholder={`Accroche (${activeLang.toUpperCase()})`}
                                    value={formData.accroche[activeLang]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 h-20 resize-none"
                              />
                        </div>
                  </div>

                  {/* Contenu */}
                  <textarea
                        name="content"
                        data-lang={activeLang}
                        placeholder={`Contenu (${activeLang.toUpperCase()})`}
                        value={formData.content[activeLang]}
                        onChange={handleChange}
                        className={`w-full border rounded px-3 py-2 h-40 resize-none ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                  />

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
