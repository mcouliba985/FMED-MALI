import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const TitleMember = styled.h2`
      text-transform: normal;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const MemberComponent = () => {
      const [members, setMembers] = useState([]);

      useEffect(() => {
            async function memberFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getMembers);
                        const response = await fetchRequest.json();

                        setMembers(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            memberFunc();
      }, []);

      return (
            <section className="container">
                  <div>
                        <TitleMember>Les membres d’équipe FMED</TitleMember>
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
                              Voir plus
                        </a>
                  </div>
            </section>
      );
};

export default MemberComponent;
