import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const TitleMember = styled.h2`
      text-transform: normal;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const MemberComponent = () => {
      const [members, setMembers] = useState([]);
      const { t } = useTranslation();

      useEffect(() => {
            async function TestimonialFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getMembers);

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
                              setMembers(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            TestimonialFunc();
      }, []);

      if (members === undefined) return null;

      return (
            <section className="container">
                  <div>
                        <TitleMember>{t('teamMembers')}</TitleMember>
                  </div>
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
                        className="relative p-4"
                  >
                        {members.slice(0, 8).map((member) => {
                              return (
                                    <SwiperSlide key={member.id}>
                                          <img src={member.imagePath} alt="" />
                                    </SwiperSlide>
                              );
                        })}
                  </Swiper>

                  <div className="flex justify-center">
                        <a
                              href="our-teams"
                              className="bg-gold hover:bg-black text-white
                          px-4 py-3 rounded-2xl"
                        >
                              {t('seeMore')}
                        </a>
                  </div>
            </section>
      );
};

export default MemberComponent;
