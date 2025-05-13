import styled from 'styled-components';
import shape from '../../assets/icons/shape.png';
import spade from '../../assets/icons/sprade-green.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const TestimonialsComponent = () => {
      const [testimonials, setTestimonials] = useState([]);
      const [selectedTestimonial, setSelectedTestimonial] = useState(null);

      useEffect(() => {
            async function TestimonialFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getTestimonial);

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
                              setTestimonials(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            TestimonialFunc();
      }, []);

      if (testimonials === undefined) return null;

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
                              {testimonials.map((testimonial) => (
                                    <SwiperSlide key={testimonial.id}>
                                          <Testimonialcontent className="rounded-2xl p-4">
                                                <p>
                                                      {testimonial.message.length > 250
                                                            ? `${testimonial.message.slice(0, testimonial.message.indexOf(' ', 250))}...`
                                                            : testimonial.message}
                                                </p>

                                                <button
                                                      className="see-more-btn"
                                                      onClick={() =>
                                                            setSelectedTestimonial(testimonial)
                                                      }
                                                >
                                                      Voir le commentaire
                                                </button>

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
                              ))}
                        </Swiper>

                        <div className="flex justify-center gap-6 my-6">
                              <button className="prev-button rounded-[64px] bg-gold hover:bg-yellow-300 text-white w-12 h-12 flex items-center justify-center">
                                    <i className="fas fa-arrow-left"></i>
                              </button>
                              <button className="next-button rounded-[64px] bg-black hover:bg-white hover:text-black text-white w-12 h-12 flex items-center justify-center">
                                    <i className="fas fa-arrow-right"></i>
                              </button>
                        </div>
                  </section>

                  {/* Modal affichant le commentaire complet */}
                  {selectedTestimonial && (
                        <div
                              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                              onClick={() => setSelectedTestimonial(null)}
                        >
                              <div
                                    className="bg-white rounded-xl p-6 max-w-lg w-full relative"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    <button
                                          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                                          onClick={() => setSelectedTestimonial(null)}
                                    >
                                          &times;
                                    </button>
                                    <h2 className="text-xl font-bold mb-2">
                                          {selectedTestimonial.fullName}
                                    </h2>
                                    <p className="text-gray-500 mb-1">
                                          {selectedTestimonial.poste}
                                    </p>
                                    <p className="text-gray-800">{selectedTestimonial.message}</p>
                              </div>
                        </div>
                  )}
            </TestimonialsWrapper>
      );
};

export default TestimonialsComponent;

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
      position: relative;
      width: 100%;
      height: 350px;
      border: 1px solid #ffc107;
      overflow: hidden;

      &:hover .see-more-btn {
            opacity: 1;
            visibility: visible;
      }

      .see-more-btn {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 10;
      }
`;

const SpadeDecorator = styled.div`
      position: relative;
      width: 96px;
      height: 96px;
`;
