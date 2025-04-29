import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import members from '../../utils/member.json';

const TitleMember = styled.h2`
      text-transform: normal;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const MemberComponent = () => {
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
                        {members.map((member) => {
                              return (
                                    <SwiperSlide key={member.id}>
                                          <img src={member.imagePath} alt="" />
                                    </SwiperSlide>
                              );
                        })}
                  </Swiper>

                  <div className="flex justify-center">
                        <button
                              className="bg-gold hover:bg-black text-white
                          px-4 py-3 rounded-2xl"
                        >
                              Voir plus
                        </button>
                  </div>
            </section>
      );
};

export default MemberComponent;
