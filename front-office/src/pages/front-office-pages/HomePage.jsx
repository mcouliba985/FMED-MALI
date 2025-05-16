import CustomCarousel from '../../components/home/CustomCarousel';
import shapeHand from '../../assets/icons/shape-hand.png';
import styled from 'styled-components';
import ServiceComponent from '../../components/home/ServiceComponent';
import VideoComponent from '../../components/home/VideoComponent';
import FmedInfo from '../../components/home/fmed-info-component';
import MemberComponent from '../../components/home/MemberComponent';
import TestimonialsComponent from '../../components/home/TestimonialsComponent';
import PartenairesComponent from '../../components/home/PartenairesComponent';
import { motion } from 'framer-motion';

const ImageDecorator = styled.div`
      position: absolute;
      left: 0;
      z-index: 0;
`;

const Home = () => {
      return (
            <section className="relative">
                  {/* Carousel */}
                  <div className="relative z-0">
                        <CustomCarousel />
                  </div>

                  <ImageDecorator>
                        <motion.img
                              className="mt-[-130px]"
                              src={shapeHand}
                              alt="shape_hand"
                              animate={{ y: [0, -20, 0] }}
                              transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'easeInOut',
                              }}
                        />
                  </ImageDecorator>

                  {/* Section qui passe DEVANT */}
                  <div className="container mb-16">
                        <section className="bg-light w-[90%] md:w-[100%] lg:w-[80%] mx-auto -mt-20 p-6 rounded-xl shadow-lg relative z-10">
                              <h4 className="text-medgreen text-center font-poppins font-bold mb-4 text-lg md:text-xl">
                                    Commencer à donner aux pauvres
                              </h4>
                              <h2 className="text-center font-poppins font-bold text-2xl md:text-4xl mb-4">
                                    Nos domaines d’interventions
                              </h2>
                              <p className="font-roboto text-center text-sm md:text-base lg:text-[20px] leading-5 text-gray-700">
                                    Rejoignez notre programme de dons mensuels afin d'apporter un
                                    soutien constant à nos initiatives. Les contributions
                                    régulières, quel que soit leur montant, nous aident à planifier
                                    et à soutenir des projets à long terme.
                              </p>
                        </section>
                  </div>

                  <div>
                        <ServiceComponent />
                  </div>

                  <div className="mb-4">
                        <VideoComponent />
                  </div>

                  <div className="mb-4">
                        <FmedInfo />
                  </div>

                  <div className="mb-4">
                        <MemberComponent />
                  </div>

                  <div className="mb-4">
                        <TestimonialsComponent />
                  </div>

                  <div className="mb-4">
                        <PartenairesComponent />
                  </div>
            </section>
      );
};

export default Home;
