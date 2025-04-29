import styled from 'styled-components';
import shape from '../../assets/icons/shape.png';
import spade from '../../assets/icons/sprade-green.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import testimonials from '../../utils/Testimonials.json';

const TestimonialsWrapper = styled.section`
      background: url(${shape}) no-repeat;
`;

const TitleTestimonial = styled.h2`
      text-transform: normal;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const Testimonialcontent = styled.article`
      width: 100%;
      height: 350px;
      border: 1px solid #ffc107;
`;

const SpadeDecorator = styled.div`
      position: relative;
      width: 96px;
      height: 96px;
`;

const TestimonialsComponent = () => {
      return (
            <TestimonialsWrapper>
                  <section className="container py-8">
                        <div className="flex justify-between items-end pb-4">
                              <TitleTestimonial>Les témoignages</TitleTestimonial>

                              <SpadeDecorator>
                                    <img className="w-full h-full" src={spade} alt="spade" />
                              </SpadeDecorator>
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
                                    delay: 3000,
                                    disableOnInteraction: false,
                              }}
                              breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1300: { slidesPerView: 4 },
                              }}
                              loop={true}
                              className="relative mt-5"
                        >
                              {testimonials.map((testimonial) => {
                                    return (
                                          <SwiperSlide key={testimonial.id}>
                                                <Testimonialcontent className="rounded-2xl p-4">
                                                      <p>
                                                            {testimonial.Message.length > 250
                                                                  ? `${testimonial.Message.slice(0, testimonial.Message.indexOf(' ', 250))}...`
                                                                  : testimonial.Message}
                                                      </p>

                                                      <div className="flex gap-4 mt-4 items-center absolute bottom-8">
                                                            <img
                                                                  className="w-12 h-12 rounded-full"
                                                                  src={testimonial.imagePath}
                                                                  alt={testimonial.imageName}
                                                            />

                                                            <div>
                                                                  <h2 className="uppercase font-bold font-nunito">
                                                                        {testimonial.fullName}
                                                                  </h2>
                                                                  <p>{testimonial.poste}</p>
                                                            </div>
                                                      </div>
                                                </Testimonialcontent>
                                          </SwiperSlide>
                                    );
                              })}
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
            </TestimonialsWrapper>
      );
};

export default TestimonialsComponent;
