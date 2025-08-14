import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import Loader from '../../../components/main/loader-component';
import { useTranslation } from 'react-i18next';
import GoogleMapComponent from '../../../components/main/google-map-component';

export default function PreviewEvent() {
      const { eventID } = useParams();
      const [event, setEvent] = useState(null);
      const [loading, setLoading] = useState(false);
      const { i18n } = useTranslation();

      useEffect(() => {
            if (!eventID) return;

            async function fetchEvent() {
                  try {
                        const res = await fetch(`${API_ENDPOINTS.getEvents}/${eventID}`);
                        const data = await res.json();
                        setEvent(data);
                        console.log(data);
                  } catch (error) {
                        console.error('Erreur lors du chargement de l’événement :', error);
                  }
            }

            fetchEvent();
      }, [eventID]);

      const handleStatusChange = async (newStatus) => {
            setLoading(true);
            try {
                  const res = await fetch(`${API_ENDPOINTS.getEvents}/${eventID}/status`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: newStatus }),
                  });

                  if (!res.ok) throw new Error('Erreur de mise à jour');

                  const updated = await res.json();
                  setEvent(updated);
                  window.location.reload();
            } catch (error) {
                  console.error('Erreur de mise à jour du statut :', error);
            } finally {
                  setLoading(false);
            }
      };

      if (!event) return <p className="text-center mt-6">Chargement de l’événement...</p>;

      const currentLang = i18n.language || 'fr';
      const eventTitle = event.title?.[currentLang] || '';
      const eventHook = event.hook?.[currentLang] || '';
      const eventContent = event.content?.[currentLang] || '';
      const eventLocation = event.location?.[currentLang] || '';
      const eventProgram =
            event.program?.map((item, idx) => item?.[currentLang]).filter(Boolean) || [];

      return (
            <div className="max-w-4xl mx-auto bg-white p-6">
                  {/* Image + Titre */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {event.imagePath ? (
                              <img
                                    src={event.imagePath}
                                    alt={event.imageName || 'Image événement'}
                                    className="w-full md:w-64 h-auto object-cover rounded-md"
                              />
                        ) : (
                              <div className="w-full md:w-64 h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                    Pas d’image
                              </div>
                        )}
                        <div>
                              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    {eventTitle}
                              </h1>
                              <p className="text-sm text-gray-500">
                                    <strong>
                                          {new Date(event.createAt).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                          })}
                                    </strong>
                                    {' — '}
                                    <span className="text-yellow-600">
                                          Catégorie {event.category}
                                    </span>
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                    📅 {new Date(event.eventDate).toLocaleDateString('fr-FR')} | 📍{' '}
                                    {eventLocation}
                              </p>
                              <p className="mt-2 text-gray-700">{eventHook}</p>
                        </div>
                  </div>

                  {/* Contenu */}
                  <div className="mt-6 space-y-4 text-gray-800">
                        <p>{eventContent}</p>
                  </div>

                  {/* Programme */}
                  {eventProgram.length > 0 && (
                        <div className="mt-6">
                              <h2 className="font-bold text-lg mb-2">Programme</h2>
                              <ul className="list-disc list-inside space-y-1">
                                    {eventProgram.map((p, idx) => (
                                          <li key={idx}>{p}</li>
                                    ))}
                              </ul>
                        </div>
                  )}

                  {/* Carte (latitude / longitude) */}
                  {event.latitude && event.longitude && (
                        <div className="mt-6">
                              <GoogleMapComponent
                                    latitude={event.latitude}
                                    longitude={event.longitude}
                              />
                        </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-4 mt-6">
                        <a
                              href={`/admin/edit-event/${event.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                              disabled={loading}
                        >
                              Modifier
                        </a>

                        {event.status === 'draft' && (
                              <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('published')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Publier'
                                    )}
                              </button>
                        )}

                        {event.status === 'published' && (
                              <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('disabled')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Désactiver'
                                    )}
                              </button>
                        )}

                        {event.status === 'disabled' && (
                              <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                                    onClick={() => handleStatusChange('published')}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <>
                                                <Loader size={5} color="black" />
                                                <span>Enregistrement...</span>
                                          </>
                                    ) : (
                                          'Réactiver'
                                    )}
                              </button>
                        )}
                  </div>
            </div>
      );
}
