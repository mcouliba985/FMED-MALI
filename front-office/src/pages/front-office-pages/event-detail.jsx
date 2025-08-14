import { useEffect, useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import GoogleMapComponent from './../../components/main/google-map-component';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
      const { i18n } = useTranslation(); // pour savoir la langue active
      const { eventID } = useParams();
      const [event, setEvent] = useState(null);

      useEffect(() => {
            if (!eventID) return;

            async function fetchEvent() {
                  try {
                        const res = await fetch(`${API_ENDPOINTS.getEvents}/${eventID}`);
                        const data = await res.json();

                        console.log(res);

                        setEvent(data);
                  } catch (error) {
                        console.error('Erreur de chargement :', error);
                  }
            }

            fetchEvent();
      }, [eventID]);

      if (!event) {
            return <p className="text-center py-8">Chargement en cours...</p>;
      }

      // langue active
      const lang = i18n.language || 'fr';

      const coverContent = {
            title: lang === 'fr' ? "Détails de l'événement" : 'Event details',
      };

      return (
            <section>
                  <CoverPageComponent title={coverContent.title} />

                  <section className="container py-8 lg:px-8">
                        <div className="row">
                              {/* Image + Date + Lieu */}
                              <div className="col-12 col-md-9 col-lg-8 mb-4">
                                    <img
                                          className="w-100 h-auto max-h-[430px] lg:max-h-[600px] rounded-2xl object-cover"
                                          src={event.imagePath}
                                          alt={event.title[lang]}
                                    />
                                    <div className="flex gap-4 py-3 px-2 ">
                                          <h4 className="font-nunito font-bold text-sm lg:text-base">
                                                <i className="far fa-calendar-days text-gold me-2"></i>
                                                {new Date(event.eventDate).toLocaleDateString(
                                                      lang,
                                                      {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                      }
                                                )}
                                          </h4>
                                          <h4 className="font-nunito font-bold text-sm lg:text-base">
                                                <i className="fas fa-location-dot text-gold me-2"></i>
                                                {event.location[lang]}
                                          </h4>
                                    </div>
                              </div>

                              {/* Programme */}
                              <div className="col-12 col-md-3 col-lg-4">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                {lang === 'fr'
                                                      ? 'Programme de l’événement'
                                                      : 'Event Program'}
                                          </h2>
                                          <ol className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2 list-decimal list-inside">
                                                {event.program.map((item, index) => (
                                                      <li
                                                            key={index}
                                                            className="text-sm sm:text-base"
                                                      >
                                                            {item[lang]}
                                                      </li>
                                                ))}
                                          </ol>
                                    </div>
                              </div>
                        </div>

                        {/* Titre + Description */}
                        <div className="row mb-4">
                              <div className="col-12">
                                    <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 w-100 sm:w-2/3">
                                          {event.title[lang]}
                                    </h2>
                                    <p className="font-roboto text-justify text-base sm:text-lg lg:text-base leading-7">
                                          {event.content[lang]}
                                    </p>
                              </div>
                        </div>

                        {/* Carte */}
                        <div className="row">
                              <h2 className="col-12 font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                                    {lang === 'fr' ? 'Localisation' : 'Location'}
                              </h2>
                              <div className="max-h-96">
                                    <GoogleMapComponent
                                          latitude={event.latitude}
                                          longitude={event.longitude}
                                    />
                              </div>
                        </div>
                  </section>
            </section>
      );
};

export default EventDetail;
