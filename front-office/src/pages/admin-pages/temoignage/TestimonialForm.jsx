import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';

const TestimonialForm = () => {
      const [form, setForm] = useState({
            fullName: '',
            poste: '',
            message: '',
            image: null,
      });

      const [preview, setPreview] = useState(null);
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
            if (e.target.name === 'image') {
                  const file = e.target.files[0];
                  setForm({ ...form, image: file });
                  setPreview(URL.createObjectURL(file));
            } else {
                  setForm({ ...form, [e.target.name]: e.target.value });
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const formData = new FormData();
            const infos = {
                  fullName: form.fullName,
                  poste: form.poste,
                  message: form.message,
            };

            formData.append('informations', JSON.stringify(infos));
            if (form.image) formData.append('file', form.image);

            try {
                  const response = await fetch(API_ENDPOINTS.createTestimonial, {
                        method: 'POST',
                        body: formData,
                  });

                  if (response.ok) {
                        setForm({ fullName: '', poste: '', message: '', image: null });
                        setPreview(null);
                        window.location.reload();
                  } else {
                        const errorData = await response.json();
                        console.error(errorData);
                        alert('Erreur lors de la soumission.');
                  }
            } catch (err) {
                  console.error(err);
                  alert('Erreur réseau.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="max-w-3xl bg-white  p-6 space-y-6">
                  <h2 className="text-2xl font-bold ">Laisse un Témoignage</h2>

                  <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                              {preview ? (
                                    <img
                                          src={preview}
                                          alt="Preview"
                                          className="rounded-xl w-full h-40 object-cover border"
                                    />
                              ) : (
                                    <div className="w-full h-40 bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400">
                                          Aperçu image
                                    </div>
                              )}
                              <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                              />
                        </div>

                        <div className="w-full md:w-2/3 space-y-4">
                              <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Nom"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              />
                              <input
                                    type="text"
                                    name="poste"
                                    placeholder="Poste"
                                    value={form.poste}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              />
                        </div>
                  </div>

                  <textarea
                        name="message"
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />

                  <div className="text-right">
                        <button
                              type="submit"
                              disabled={loading}
                              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
                        >
                              {loading ? 'Envoi en cours...' : 'Envoyé'}
                        </button>
                  </div>
            </form>
      );
};

export default TestimonialForm;
