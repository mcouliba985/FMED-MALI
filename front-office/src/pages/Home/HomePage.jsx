import CustomCarousel from '../../components/home/CustomCarousel';
import slide1 from '../../assets/images/carousel-1.jpg';
import slide2 from '../../assets/images/carousel-2.jpg';
import slide3 from '../../assets/images/carousel-3.jpg';
import slide4 from '../../assets/images/carousel-4.jpg';
import shapeHand from '../../assets/icons/shape-hand.png';
import Main from './../../layouts/Main/Main';
import styled from 'styled-components';
import ServiceComponent from '../../components/home/ServiceComponent';
import VideoComponent from './../../components/home/VideoComponent';
import FmedInfo from '../../components/home/fmed-info-component';
import MemberComponent from '../../components/home/MemberComponent';
import TestimonialsComponent from '../../components/home/TestimonialsComponent';
import PartenairesComponent from '../../components/home/PartenairesComponent';

const ImageDecorator = styled.div`
      position: absolute;
      left: 0;
      z-index: 0;
`;

const Home = () => {
      const slides = [
            {
                  image: slide1,
                  text: 'Des Maliens généreux pour un Mali meilleur, professionnel des jeunes maliens',
            },
            {
                  image: slide2,
                  text: 'Rejoignez les donateurs qui œuvrent chaque jour pour un Mali plus solidaire',
            },
            {
                  image: slide3,
                  text: 'Grâce à vos contributions, des projets concrets voient le jour partout au Mali.',
            },
            {
                  image: slide4,
                  text: 'Particuliers ou entreprises, chaque don compte pour bâtir un avenir meilleur.',
            },
      ];

      return (
            <Main className="relative">
                  {/* Carousel */}
                  <div className="relative z-0">
                        <CustomCarousel slides={slides} />
                  </div>

                  <ImageDecorator>
                        <img className="mt-[-130px]" src={shapeHand} alt="shape_hand" />
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
            </Main>
      );
};

export default Home;
