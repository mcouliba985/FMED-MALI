import React from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = ({ slides }) => {
      return (
            <Carousel fade controls={false} indicators={false} interval={3000}>
                  {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                              <div
                                    className="relative w-full h-[820px] bg-center bg-cover"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                              >
                                    {/* Overlay sombre */}
                                    <div className="absolute inset-0 bg-black opacity-50 z-0" />

                                    {/* Contenu centré */}
                                    <div className="container h-full flex items-center relative z-10">
                                          <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4">
                                                {/* Texte à gauche */}
                                                <h2 className="text-white font-bold w-full lg:w-1/2 text-[clamp(30px,5vw,60px)] leading-[1.4]">
                                                      {slide.text}
                                                </h2>

                                                {/* Boutons à droite */}
                                                <div className="mt-6 lg:mt-0 flex flex-col lg:gap-6 gap-4">
                                                      <button className="bg-deepgreen text-white px-6 lg:px-16 py-3 hover:bg-green-800 transition-all rounded-2xl text-lg font-roboto">
                                                            En savoir plus
                                                      </button>
                                                      <button className="bg-gold text-white px-6 lg:px-16 py-3 hover:bg-yellow-600 transition-all rounded-2xl text-lg font-roboto">
                                                            Contactez-Nous
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </Carousel.Item>
                  ))}
            </Carousel>
      );
};

export default CustomCarousel;
