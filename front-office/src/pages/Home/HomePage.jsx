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
            <section class="flex items-center justify-center h-screen bg-gray-100">
                  <div class="text-center">
                        <h2 class="text-2xl font-semibold text-red-600 mb-4">
                              Contenu inaccessible
                        </h2>
                        <p class="text-gray-700">
                              Nous n’avons pas pu charger les informations demandées. Veuillez
                              vérifier votre connexion ou réessayer plus tard.
                        </p>
                  </div>
            </section>
      );
};

export default Home;
