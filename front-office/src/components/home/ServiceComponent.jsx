import BG1 from '../../assets/res/bg-one.png';
import BG2 from '../../assets/res/bg-two.png';
import BG3 from '../../assets/res/bg-three.png';
import BG4 from '../../assets/res/bg-four.png';
import SIMG1 from '../../assets/icons/s-img (1).png';
import SIMG2 from '../../assets/icons/s-img (2).png';
import SIMG3 from '../../assets/icons/s-img (3).png';
import SIMG4 from '../../assets/icons/s-image.png';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';

const ServiceWrapper = styled.div`
      background-image: ${({ res }) => `url(${res})`};
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 80px 0px;
      width: 350px;
      height: 350px;
`;

const ServiceComponent = () => {
      const { t } = useTranslation();

      return (
            <section className="container">
                  <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                              nextEl: '.next-button',
                              prevEl: '.prev-button',
                        }}
                        autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                        }}
                        breakpoints={{
                              640: { slidesPerView: 1 },
                              768: { slidesPerView: 2 },
                              1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        className="relative"
                  >
                        <SwiperSlide>
                              <ServiceWrapper res={BG3}>
                                    <img src={SIMG3} alt="simg1" className="w-16 mx-auto" />
                                    <div className="mt-4">
                                          <a
                                                href="/domain/humanitaire"
                                                className="font-nunito text-lg hover:text-green-700 font-extrabold"
                                          >
                                                {t('humanitarianTitle')}
                                          </a>
                                          <p className="text-center font-roboto text-lg p-4">
                                                {t('humanitarianDesc')}
                                          </p>
                                    </div>
                              </ServiceWrapper>
                        </SwiperSlide>

                        <SwiperSlide>
                              <ServiceWrapper res={BG1}>
                                    <img src={SIMG2} alt="simg2" className="w-16 mx-auto" />
                                    <div className="mt-4">
                                          <a
                                                href="/domain/socio-professional"
                                                className="font-nunito text-lg hover:text-yellow-400 font-extrabold"
                                          >
                                                {t('socioTitle')}
                                          </a>
                                          <p className="text-center font-roboto text-lg p-4">
                                                {t('socioDesc')}
                                          </p>
                                    </div>
                              </ServiceWrapper>
                        </SwiperSlide>

                        <SwiperSlide>
                              <ServiceWrapper res={BG2}>
                                    <img src={SIMG1} alt="simg3" className="w-16 mx-auto" />
                                    <div className="mt-4">
                                          <a
                                                href="/domain/population"
                                                className="font-nunito text-lg hover:text-red-700 font-extrabold"
                                          >
                                                {t('populationTitle')}
                                          </a>
                                          <p className="text-center font-roboto text-lg p-4">
                                                {t('populationDesc')}
                                          </p>
                                    </div>
                              </ServiceWrapper>
                        </SwiperSlide>

                        <SwiperSlide>
                              <ServiceWrapper res={BG4}>
                                    <img src={SIMG4} alt="simg3" className="w-16 mx-auto" />
                                    <div className="mt-4">
                                          <a
                                                href="/domain/vivre-ensemble"
                                                className="font-nunito text-lg hover:text-green-600 font-extrabold"
                                          >
                                                {t('cohesionTitle')}
                                          </a>
                                          <p className="text-center font-roboto text-lg p-4">
                                                {t('cohesionDesc')}
                                          </p>
                                    </div>
                              </ServiceWrapper>
                        </SwiperSlide>
                  </Swiper>

                  {/* Boutons de navigation */}
                  <div className="flex justify-center gap-6 my-6">
                        <button className="prev-button rounded-[64px] bg-gold hover:bg-yellow-300 text-white w-12 h-12 flex items-center justify-center">
                              <i className="fas fa-arrow-left"></i>
                        </button>
                        <button className="next-button rounded-[64px] bg-black hover:bg-white hover:text-black text-white w-12 h-12 flex items-center justify-center">
                              <i className="fas fa-arrow-right"></i>
                        </button>
                  </div>
            </section>
      );
};

export default ServiceComponent;
