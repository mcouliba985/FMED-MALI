import styled from 'styled-components';
import spadeBaseYellow from '../../assets/icons/spade-base.png';
import decorateur from '../../assets/icons/decorator.png';
import NewsletterForm from '../../components/footer/NewsleeterForm';

const FooterPage = () => {
      return (
            <FooterWrapper>
                  <div className="container relative">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                              <NewsletterWrapper>
                                    <div>
                                          <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl">
                                                S'abonner à notre Newsletter
                                          </h2>
                                          <p className="font-nunito font-light text-base mt-2">
                                                Inspections régulières et mécanismes de retour
                                                d'information
                                          </p>
                                    </div>
                              </NewsletterWrapper>

                              {/* Partie droite */}
                              <div className="w-full lg:w-4/12">
                                    <NewsletterForm />
                              </div>
                        </div>

                        <Separator setMargin={'3rem'} />

                        <div className="row lg:justify-content-center text-start lg:mx-16">
                              <section className="col-12 col-md-6 col-lg-4 mb-4">
                                    <SectionTitle>Quick Links</SectionTitle>
                                    <FooterLink href="/about/history" showIcon={true}>
                                          Notre historie
                                    </FooterLink>
                                    <FooterLink href="/about/mission" showIcon={true}>
                                          Notre mission
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/fonsej-news">
                                          Actualités Fonsej
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/list-event">
                                          Evenements
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/gallery">
                                          Nos Realisations
                                    </FooterLink>
                                    <a
                                          className="px-4 hidden lg:block hover:text-gold"
                                          href="/admin/list-article"
                                    >
                                          Web Meld
                                    </a>
                              </section>

                              <section className="col-12 col-md-6 col-lg-4 mb-4">
                                    <SectionTitle>Nos Domaines</SectionTitle>
                                    <FooterLink showIcon={true} href="/domain/humanitaire">
                                          Humanitaires
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/domain/socio-professional">
                                          Socio-profesionels
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/domain/population">
                                          Soutiens au populations
                                    </FooterLink>
                                    <FooterLink showIcon={true} href="/domain/vivre-ensemble">
                                          Soutiens vivre ensemble
                                    </FooterLink>
                              </section>

                              <section className="col-12 col-md-6 col-lg-4 mb-4">
                                    <SectionTitle>Rejoingez-nous</SectionTitle>
                                    <div className="block text-white text-base mb-5 relative pl-6 font-poppins font-extralight hover:text-[#2ecc71] transition-colors duration-200">
                                          <i className="fas fa-map-location-dot absolute left-0 top-1 text-white"></i>
                                          Siège social : Hamdallaye ACI Immeuble Alfarouk non loin
                                          de CANAL+
                                    </div>

                                    <div className="block text-white text-base mb-5 relative pl-6 font-poppins font-extralight hover:text-[#2ecc71] transition-colors duration-200">
                                          <i className="fas fa-phone absolute left-0 top-1 text-white"></i>
                                          +223 20 22 24 02 / <br /> +223 76 30 45 84
                                    </div>

                                    <div className="block text-white text-base mb-5 relative pl-6 font-poppins font-extralight hover:text-[#2ecc71] transition-colors duration-200">
                                          <i className="fas fa-envelope-open-text absolute left-0 top-1 text-white"></i>
                                          contact@fmed.ml
                                    </div>
                              </section>
                        </div>

                        <FooterBottom>
                              <FooterLink
                                    target="_blank"
                                    href="https://magservices-mali.org/"
                                    showIcon={false}
                              >
                                    &copy; {new Date().getFullYear()} FMED Mali. Tous droits
                                    réservés — Site développé par MAG SERVICES MALI
                              </FooterLink>
                        </FooterBottom>
                  </div>
            </FooterWrapper>
      );
};

export default FooterPage;

const FooterWrapper = styled.footer`
      background-color: #122f2a; /* gray-900 */
      color: white;
      padding: 32px;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 12px;
      width: 100%;
      height: auto;
      position: relative;
`;

const NewsletterWrapper = styled.div`
      position: relative;
      display: inline-block; /* adapte selon ton layout */

      /* espace pour ::before sur desktop */
      @media (min-width: 1024px) {
            padding-left: 4rem; /* laisse la place à l’image à gauche */
      }

      /* IMAGE À GAUCHE EN DESKTOP */
      &::before {
            content: '';
            display: none;
      }
      @media (min-width: 1024px) {
            &::before {
                  display: block;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 4rem;
                  height: 4rem;
                  background: url(${spadeBaseYellow}) no-repeat center/contain;
                  opacity: 0.4;
                  pointer-events: none;
            }
      }
`;

const Separator = styled.hr`
      border: 0;
      border-top: 1px solid #ffffff; /* ligne blanche */
      width: 100%;
      margin: ${({ setMargin }) => setMargin} 0; /* un petit espace au-dessus et en-dessous */
`;

const SectionTitle = styled.h3`
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      font-family: 'Nunito Sans';
      font-size: 24px;
`;

const FooterLink = styled.a`
      display: block;
      font-size: 1rem;
      color: white;
      margin-bottom: 20px;
      text-decoration: none;
      position: relative;
      padding-left: 24px;
      font-family: 'Poppins';
      font-weight: 200;

      &:hover {
            color: #2ecc71; /* medgreen */
      }

      &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: ${({ showIcon }) => (showIcon ? `url(${decorateur})` : 'none')};
      }
`;

const FooterBottom = styled.div`
      border-top: 1px solid #374151; /* gray-700 */
      text-align: center;
      padding: 1rem 0;
      font-size: 0.875rem;
`;
