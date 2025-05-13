import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const CustomCarousel = () => {
      const [slides, setSlides] = useState([]);

      useEffect(() => {
            async function slideFunc() {
                  console.log('API_ENDPOINTS:', API_ENDPOINTS);

                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getCarouselElement);

                        // Vérifie si la requête s'est bien passée
                        if (!fetchRequest.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des slides :',
                                    fetchRequest.status
                              );
                              return;
                        }

                        const data = await fetchRequest.json();

                        // Vérifie que le format de données est correct
                        if (Array.isArray(data)) {
                              setSlides(data);
                        } else {
                              console.warn('Format inattendu pour les slides :', data);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des slides :', error);
                  }
            }

            slideFunc();
      }, []);

      if (slides === undefined) return null;

      return (
            <Carousel fade controls={false} indicators={false} interval={3000}>
                  {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                              <div
                                    className="relative w-full h-[575px] lg:h-[820px] bg-center bg-cover"
                                    style={{ backgroundImage: `url(${slide.imagePath})` }}
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
                                                <div className="mt-6 lg:mt-0 flex flex-col md:flex-row lg:flex-col lg:gap-6 gap-4">
                                                      <Link
                                                            to={'/about/mission'}
                                                            className="bg-deepgreen text-white px-6 lg:px-16 py-3 hover:bg-green-800 transition-all rounded-2xl text-lg font-roboto"
                                                      >
                                                            En savoir plus
                                                      </Link>
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
