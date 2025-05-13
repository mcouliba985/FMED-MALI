import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const Title = styled.h2`
      text-transform: capitalize;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const PartenairesComponent = () => {
      const [partenaires, setImages] = useState([]);

      useEffect(() => {
            const fetchPartners = async () => {
                  try {
                        const res = await fetch(API_ENDPOINTS.getPartners);
                        const data = await res.json();
                        setImages(data);
                  } catch (err) {
                        console.error('Erreur lors du chargement des partenaires :', err);
                  }
            };

            fetchPartners();
      }, []);

      if (partenaires === undefined) return null;

      return (
            <section className="container">
                  <Title>Nos Partenaires</Title>

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
                                                <img
                                                      className="w-full h-full"
                                                      src={partenaire.logoPath}
                                                      alt={partenaire.logoName || 'Logo partenaire'}
                                                />
                                          </div>
                                    </SwiperSlide>
                              );
                        })}
                  </Swiper>
            </section>
      );
};

export default PartenairesComponent;
