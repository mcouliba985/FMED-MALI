import styled from 'styled-components';
import bamako from '../../assets/res/bamako.jpg';
import spade from '../../assets/icons/sprade-base.png';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const CoverPageComponent = ({ title, showSection, label, hook }) => {
      return (
            <section className="relative">
                  <Container>
                        <Overlay>
                              <ContentWrapper className="container">
                                    <IconContainer>
                                          <SpadeIcon
                                                src={spade}
                                                alt="spade icon"
                                                animate={{ y: [0, -15, 0, 15, 0] }}
                                                transition={{
                                                      duration: 3,
                                                      repeat: Infinity,
                                                      ease: 'easeInOut',
                                                }}
                                          />
                                    </IconContainer>

                                    <TitleContainer>
                                          <Title>{title}</Title>
                                    </TitleContainer>
                              </ContentWrapper>
                        </Overlay>
                  </Container>

                  {showSection && (
                        <div className="container mb-16">
                              <section className="bg-light w-[90%] md:w-[100%] lg:w-[70%] mx-auto -mt-20 p-6 rounded-xl shadow-lg relative z-10">
                                    <h2 className="text-center font-poppins font-bold text-2xl md:text-4xl mb-4">
                                          {label}
                                    </h2>
                                    <p className="font-roboto text-center text-sm md:text-base lg:text-[20px] leading-5 text-gray-700">
                                          {hook}
                                    </p>
                              </section>
                        </div>
                  )}
            </section>
      );
};

export default CoverPageComponent;

CoverPageComponent.propTypes = {
      title: PropTypes.string.isRequired,
      showSection: PropTypes.bool,
      label: PropTypes.string,
      hook: PropTypes.string,
};

CoverPageComponent.defaultProps = {
      showSection: false,
};

// Styled-components
const Container = styled.div`
      position: relative;
      height: 400px;
      background-image: url(${bamako});
      background-size: cover;
      background-position: top;
      width: 100%;

      @media (max-width: 768px) {
            height: 300px;
      }

      @media (max-width: 480px) {
            height: 250px;
      }
`;

const Overlay = styled.div`
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
`;

const ContentWrapper = styled.div`
      width: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 1rem;

      @media (max-width: 768px) {
            padding: 0 0.5rem;
      }
`;

const IconContainer = styled.div`
      flex: 1;
      display: flex;
      justify-content: flex-start;
`;

const SpadeIcon = styled(motion.img)`
      height: 210px;
      width: auto;

      @media (max-width: 768px) {
            height: 145px;
      }

      @media (max-width: 480px) {
            height: 96px;
      }
`;

const TitleContainer = styled.div`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100%;
`;

const Title = styled.h1`
      color: #fff;
      font-size: 3.5rem;
      margin: 0;
      font-family: 'Nunito Sans';
      font-weight: 800;

      @media (max-width: 768px) {
            font-size: 2.5rem;
      }

      @media (max-width: 480px) {
            font-size: 1.5rem;
      }
`;
