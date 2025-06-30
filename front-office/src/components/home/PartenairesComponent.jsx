import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const Title = styled.h2`
      text-transform: capitalize;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const PartenairesComponent = () => {
      const [partenaires, setImages] = useState([]);
      const { t } = useTranslation();

      useEffect(() => {
            async function partnersFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getPartners);

                        // Vérifie si la réponse HTTP est correcte (status 2xx)
                        if (!fetchRequest.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des articles :',
                                    fetchRequest.status
                              );
                              return;
                        }

                        const response = await fetchRequest.json();

                        // Vérifie si la réponse est bien un tableau
                        if (Array.isArray(response)) {
                              setImages(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            partnersFunc();
      }, []);

      if (partenaires === undefined) return null;

      return (
            <section className="container">
                  <Title>{t('ourPartners')} </Title>

                  <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                              nextEl: '.next-button',
                              prevEl: '.prev-button',
                        }}
                        autoplay={{
                              delay: 10000,
                              disableOnInteraction: false,
                        }}
                        breakpoints={{
                              640: { slidesPerView: 1 },
                              768: { slidesPerView: 2 },
                              1050: { slidesPerView: 3 },
                              1300: { slidesPerView: 4 },
                        }}
                        loop={true}
                        className="relative px-4"
                  >
                        {partenaires.map((partenaire) => {
                              return (
                                    <SwiperSlide key={partenaire.id}>
                                          <div className="block w-full h-64">
                                                <a
                                                      href={partenaire.link}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                >
                                                      <img
                                                            className="w-full h-full"
                                                            src={partenaire.logoPath}
                                                            alt={partenaire.fullName}
                                                      />
                                                </a>
                                          </div>
                                    </SwiperSlide>
                              );
                        })}
                  </Swiper>
            </section>
      );
};

export default PartenairesComponent;
