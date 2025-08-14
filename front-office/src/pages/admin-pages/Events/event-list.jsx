import { useEffect, useState } from 'react';
import { Pagination, Modal, Button } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EventList = () => {
      const { t, i18n } = useTranslation();
      const currentLang = i18n.language; // ex: 'fr' ou 'en'

      const [events, setEvents] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [eventToDelete, setEventToDelete] = useState(null);

      const totalPages = Math.ceil(events.length / itemsPerPage);
      const paginatedEvents = events.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );

      useEffect(() => {
            async function fetchEvents() {
                  try {
                        const res = await fetch(API_ENDPOINTS.getEvents);
                        if (!res.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des événements :',
                                    res.status
                              );
                              return;
                        }

                        const data = await res.json();
                        if (Array.isArray(data)) {
                              setEvents(data);
                        } else {
                              console.warn('Format inattendu reçu pour les événements :', data);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des événements :', error);
                  }
            }

            fetchEvents();
      }, []);

      const handleDeleteClick = (eventId) => {
            setEventToDelete(eventId);
            setShowDeleteModal(true);
      };

      const confirmDelete = async () => {
            if (!eventToDelete) return;

            try {
                  const res = await fetch(`${API_ENDPOINTS.deleteEvent}/${eventToDelete}`, {
                        method: 'DELETE',
                  });

                  if (!res.ok) {
                        console.error('Erreur lors de la suppression');
                        return;
                  }

                  setEvents((prev) => prev.filter((ev) => ev.id !== eventToDelete));
                  setShowDeleteModal(false);
                  setEventToDelete(null);
            } catch (err) {
                  console.error('Erreur réseau lors de la suppression', err);
            }
      };

      return (
            <div>
                  <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-1">Liste des evenement FMED</h2>
                        <p className="text-sm text-gray-600 mb-4">
                              Tous les evenement en un seul endroit. Vous pouvez consulter, ajouter
                              ou archiver chaque publication.
                        </p>

                        <div className="flex justify-end gap-4 mb-4">
                              <Link
                                    to={'/admin/add-event'}
                                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 text-sm font-semibold"
                              >
                                    Ajouter un evenement
                              </Link>
                        </div>

                        <div className="overflow-auto">
                              <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                          <tr>
                                                <th className="px-4 py-2">N°</th>
                                                <th className="px-4 py-2">image</th>
                                                <th className="px-4 py-2">Titre</th>
                                                <th className="px-4 py-2">Date</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2">option</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {paginatedEvents.map((event, index) => (
                                                <tr key={event.id} className="border-t">
                                                      <td className="px-4 py-2">
                                                            {(currentPage - 1) * itemsPerPage +
                                                                  index +
                                                                  1}
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            <img
                                                                  src={event.imagePath}
                                                                  alt={event.imageName}
                                                                  className="w-10 h-10 rounded object-cover"
                                                            />
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            {event.title?.[currentLang]}
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            {new Date(
                                                                  event.eventDate
                                                            ).toLocaleDateString(currentLang, {
                                                                  day: '2-digit',
                                                                  month: 'long',
                                                                  year: 'numeric',
                                                            })}
                                                      </td>
                                                      <td className="px-4 py-2 capitalize">
                                                            {t(`status.${event.status}`)}
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            <div className="flex justify-center gap-2">
                                                                  <Link
                                                                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                                                                        to={`/admin/preview-event/${event.id}`}
                                                                  >
                                                                        <i className="far fa-eye"></i>
                                                                  </Link>
                                                                  <span
                                                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                                                        onClick={() =>
                                                                              handleDeleteClick(
                                                                                    event.id
                                                                              )
                                                                        }
                                                                  >
                                                                        <i className="far fa-trash-can"></i>
                                                                  </span>
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>

                              <div className="flex justify-end mt-4">
                                    <Pagination
                                          currentPage={currentPage}
                                          totalPages={totalPages}
                                          onPageChange={(page) => setCurrentPage(page)}
                                    />
                              </div>
                        </div>
                  </div>

                  {/* Modal de confirmation */}
                  <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                              <Modal.Title>Confirmer la suppression</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est
                              irréversible.
                        </Modal.Body>
                        <Modal.Footer>
                              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                    Annuler
                              </Button>
                              <Button variant="danger" onClick={confirmDelete}>
                                    Supprimer
                              </Button>
                        </Modal.Footer>
                  </Modal>
            </div>
      );
};

export default EventList;
