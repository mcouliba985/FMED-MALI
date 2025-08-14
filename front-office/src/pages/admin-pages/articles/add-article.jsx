import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';
import { CATEGORIES_ENUM, TYPE_ENUM } from '../../../datas/constants';

const AddArticleForm = () => {
      const [loading, setLoading] = useState(false);
      const [activeLang, setActiveLang] = useState('fr'); // Sélecteur de langue

      const [formData, setFormData] = useState({
            title: { fr: '', en: '' },
            hook: { fr: '', en: '' },
            content: { fr: '', en: '' },
            category: '',
            type: '',
            date: '',
            image: null,
      });

      const handleChange = (e, lang = null, field = null) => {
            const { name, value, files } = e.target;
            setFormData((prev) => {
                  if (field && lang) {
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

      const [errors, setErrors] = useState({});

      const validate = () => {
            const newErrors = {};
            if (!formData.title.fr.trim()) newErrors.titleFr = 'Le titre FR est requis';
            if (!formData.title.en.trim()) newErrors.titleEn = 'Le titre EN est requis';
            if (!formData.hook.fr.trim()) newErrors.hookFr = 'L’accroche FR est requise';
            if (!formData.hook.en.trim()) newErrors.hookEn = 'L’accroche EN est requise';
            if (!formData.content.fr.trim()) newErrors.contentFr = 'Le contenu FR est requis';
            if (!formData.content.en.trim()) newErrors.contentEn = 'Le contenu EN est requis';
            if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
            if (!formData.type.trim()) newErrors.type = "le type d'article est requise";
            if (!formData.date.trim()) newErrors.date = 'La date est requise';
            return newErrors;
      };

      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  setLoading(false);
                  return;
            }

            const informations = {
                  title: formData.title,
                  hook: formData.hook,
                  content: formData.content,
                  category: formData.category,
                  status: 'brouillon',
                  archive: false,
                  type: formData.type,
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
                        setFormData({
                              title: { fr: '', en: '' },
                              hook: { fr: '', en: '' },
                              content: { fr: '', en: '' },
                              category: '',
                              type: '',
                              date: '',
                              image: null,
                        });
                        setErrors({});
                        navigate(`/admin/preview-article/${articleID}`);
                  } else {
                        alert(`Erreur : ${result.message}`);
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
                        <h2 className="text-xl font-bold mb-1">Ajouter un nouvel article</h2>
                        <p className="text-gray-600">
                              Tous les articles en un seul endroit. Vous pouvez consulter, ajouter
                              ou archiver chaque publication.
                        </p>
                  </div>

                  {/* Sélecteur de langue */}
                  <div className="flex gap-2">
                        {['fr', 'en'].map((lang) => (
                              <button
                                    type="button"
                                    key={lang}
                                    onClick={() => setActiveLang(lang)}
                                    className={`px-4 py-1 rounded border ${
                                          activeLang === lang
                                                ? 'bg-yellow-400 border-yellow-500'
                                                : 'bg-gray-200 border-gray-300'
                                    }`}
                              >
                                    {lang.toUpperCase()}
                              </button>
                        ))}
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
                                    placeholder={`Titre (${activeLang.toUpperCase()})`}
                                    value={formData.title[activeLang]}
                                    onChange={(e) => handleChange(e, activeLang, 'title')}
                                    className={`border rounded px-3 py-2 ${
                                          errors[`title${activeLang.toUpperCase()}`]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                    }`}
                              />
                              {errors[`title${activeLang.toUpperCase()}`] && (
                                    <p className="text-red-500 text-xs">
                                          {errors[`title${activeLang.toUpperCase()}`]}
                                    </p>
                              )}

                              <div className="flex gap-2">
                                    <select
                                          name="type"
                                          value={formData.type}
                                          onChange={handleChange}
                                          className={`flex-1 border rounded px-3 py-2 ${
                                                errors.type ? 'border-red-500' : 'border-gray-300'
                                          }`}
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
                                          className={`flex-1 border rounded px-3 py-2 ${
                                                errors.category
                                                      ? 'border-red-500'
                                                      : 'border-gray-300'
                                          }`}
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
                                          className={`flex-1 border rounded px-3 py-2 ${
                                                errors.date ? 'border-red-500' : 'border-gray-300'
                                          }`}
                                    />
                              </div>

                              {/* Accroche */}
                              <textarea
                                    placeholder={`Accroche / Hook (${activeLang.toUpperCase()})`}
                                    value={formData.hook[activeLang]}
                                    onChange={(e) => handleChange(e, activeLang, 'hook')}
                                    className={`border rounded px-3 py-2 h-20 resize-none ${
                                          errors[`hook${activeLang.toUpperCase()}`]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                    }`}
                              />
                              {errors[`hook${activeLang.toUpperCase()}`] && (
                                    <p className="text-red-500 text-xs">
                                          {errors[`hook${activeLang.toUpperCase()}`]}
                                    </p>
                              )}
                        </div>
                  </div>

                  {/* Contenu principal */}
                  <div>
                        <textarea
                              placeholder={`Contenu / Content (${activeLang.toUpperCase()})`}
                              value={formData.content[activeLang]}
                              onChange={(e) => handleChange(e, activeLang, 'content')}
                              className={`w-full border rounded px-3 py-2 h-40 resize-none ${
                                    errors[`content${activeLang.toUpperCase()}`]
                                          ? 'border-red-500'
                                          : 'border-gray-300'
                              }`}
                        />
                        {errors[`content${activeLang.toUpperCase()}`] && (
                              <p className="text-red-500 text-xs">
                                    {errors[`content${activeLang.toUpperCase()}`]}
                              </p>
                        )}
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

export default AddArticleForm;
