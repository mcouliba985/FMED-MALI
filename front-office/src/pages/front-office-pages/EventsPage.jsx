import { useEffect, useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const EventsPage = () => {
      const [eventData, setEventData] = useState([]);
      const { t, i18n } = useTranslation();

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
                              setEventData(data);
                        } else {
                              console.warn('Format inattendu reçu pour les événements :', data);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des événements :', error);
                  }
            }
            fetchEvents();
      }, []);

      if (!eventData || eventData.length === 0) return null;

      const coverContent = {
            title: t('eventTitle'),
            show: true,
            label: t('eventLabel'),
            hook: t('eventDesc'),
      };

      return (
            <>
                  <section>
                        <CoverPageComponent
                              title={coverContent.title}
                              showSection={coverContent.show}
                              label={coverContent.label}
                              hook={coverContent.hook}
                        />

                        <section className="container py-8">
                              {/* Événement principal */}
                              {eventData[0] && (
                                    <div className="row g-4">
                                          <div className="col-12 col-lg-8">
                                                <h1 className="font-poppins text-xl sm:text-2xl font-bold mb-4">
                                                      {t('Les événements à venir avec FMED MALI')}
                                                </h1>
                                                <div className="relative rounded-[16px] overflow-hidden w-full">
                                                      <img
                                                            src={eventData[0].imagePath}
                                                            alt={
                                                                  eventData[0].title?.[
                                                                        i18n.language
                                                                  ] || ''
                                                            }
                                                            className="w-full h-auto lg:max-h-[600px] object-cover"
                                                      />
                                                      <div className="absolute inset-0 bg-black bg-opacity-50" />
                                                      <div className="absolute bottom-0 left-0 w-full p-6 z-10 text-white">
                                                            <h4 className="font-poppins mb-2">
                                                                  {t('Pour le')}{' '}
                                                                  {new Date(
                                                                        eventData[0].eventDate
                                                                  ).toLocaleDateString(
                                                                        i18n.language,
                                                                        {
                                                                              year: 'numeric',
                                                                              month: 'long',
                                                                              day: 'numeric',
                                                                        }
                                                                  )}
                                                            </h4>
                                                            <h4 className="font-poppins mb-2">
                                                                  <i className="fas fa-location-dot me-2"></i>
                                                                  {
                                                                        eventData[0].location?.[
                                                                              i18n.language
                                                                        ]
                                                                  }
                                                            </h4>
                                                            <a
                                                                  href={`/event/${eventData[0].id}`}
                                                                  className="hover:text-gold mt-2 text-sm sm:text-base text-justify"
                                                            >
                                                                  {
                                                                        eventData[0].hook?.[
                                                                              i18n.language
                                                                        ]
                                                                  }
                                                            </a>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Événements secondaires */}
                                          <div className="col-12 col-lg-4 d-flex flex-column gap-3">
                                                {eventData.slice(1, 3).map((event) => (
                                                      <div
                                                            key={event.id}
                                                            className="relative rounded-[16px] overflow-hidden w-full"
                                                      >
                                                            <img
                                                                  src={event.imagePath}
                                                                  alt={
                                                                        event.title?.[
                                                                              i18n.language
                                                                        ] || ''
                                                                  }
                                                                  className="w-full h-auto lg:max-h-[250px] object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-50" />
                                                            <div className="absolute bottom-0 left-0 w-full p-4 z-10 text-white">
                                                                  <h4 className="font-poppins text-sm mb-1">
                                                                        {t('Pour le')}{' '}
                                                                        {new Date(
                                                                              event.eventDate
                                                                        ).toLocaleDateString(
                                                                              i18n.language,
                                                                              {
                                                                                    year: 'numeric',
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                              }
                                                                        )}
                                                                  </h4>
                                                                  <h4 className="font-poppins text-sm mb-2">
                                                                        <i className="fas fa-location-dot me-2"></i>
                                                                        {
                                                                              event.location?.[
                                                                                    i18n.language
                                                                              ]
                                                                        }
                                                                  </h4>
                                                                  <a
                                                                        href={`/event/${event.id}`}
                                                                        className="hover:text-gold text-xs sm:text-sm"
                                                                  >
                                                                        {
                                                                              event.hook?.[
                                                                                    i18n.language
                                                                              ]
                                                                        }
                                                                  </a>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Événements passés */}
                              <div className="row mt-5">
                                    <div className="col-12">
                                          <h2 className="font-nunito font-black text-xl sm:text-3xl mb-2">
                                                {t('Les événements passés avec FMED MALI')}
                                          </h2>
                                          <p className="font-poppins mb-4">
                                                {t('Voici les derniers événements avec FMED MALI')}
                                          </p>
                                    </div>

                                    {eventData.slice(3).map((event) => (
                                          <div
                                                key={event.id}
                                                className="col-12 col-sm-6 col-lg-3 mb-4"
                                          >
                                                <div className="bg-light shadow-lg rounded-2xl h-100 d-flex flex-column">
                                                      <img
                                                            className="w-100 h-64 rounded-2xl object-cover"
                                                            src={event.imagePath}
                                                            alt={event.title?.[i18n.language] || ''}
                                                      />
                                                      <div className="px-4 pb-4">
                                                            <h4 className="pt-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                                  <i className="far fa-calendar-days text-gold me-2"></i>
                                                                  {new Date(
                                                                        event.eventDate
                                                                  ).toLocaleDateString(
                                                                        i18n.language,
                                                                        {
                                                                              year: 'numeric',
                                                                              month: 'long',
                                                                              day: 'numeric',
                                                                        }
                                                                  )}
                                                            </h4>
                                                            <h4 className="pt-1 pb-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                                  <i className="fas fa-location-dot text-gold me-2"></i>
                                                                  {event.location?.[i18n.language]}
                                                            </h4>
                                                            <a
                                                                  href={`/event/${event.id}`}
                                                                  className="hover:text-gold font-bold font-poppins text-sm lg:text-lg"
                                                            >
                                                                  {event.title?.[i18n.language]}
                                                            </a>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </section>
                  </section>
            </>
      );
};

export default EventsPage;
