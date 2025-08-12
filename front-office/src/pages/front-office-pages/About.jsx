import { useParams } from 'react-router-dom';
import CoverPageComponent from '../../components/main/cover-page-component';
import { motion } from 'framer-motion';
import aboutInformation from '../../datas/about-information.json';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
      const { t } = useTranslation(); // i18next hook
      const title = t('about.pageTitle', 'A propos de nous'); // fallback si non traduit
      const { aboutKey } = useParams();
      const [about, setAbout] = useState({});

      useEffect(() => {
            if (aboutKey && aboutInformation.length > 0) {
                  const matchedAbout = aboutInformation.find((item) => item.key === aboutKey);
                  setAbout(matchedAbout || {}); // objet vide si non trouvé
            }
      }, [aboutKey]);

      return (
            <section>
                  <CoverPageComponent title={title} />

                  <section className="container py-8">
                        <div className="row lg:px-10">
                              <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                                    <div className="w-full h-full lg:h-96">
                                          <img
                                                className="w-full h-full rounded-2xl object-cover"
                                                src={about.imagePath}
                                                alt={about.imageName}
                                          />
                                    </div>
                              </div>

                              <div className="col-12 col-lg-7">
                                    <h1 className="font-poppins font-black text-2xl md:text-4xl leading-normal mb-4 px-4">
                                          {t(`about.${aboutKey}.hookTitle`, about.hookTitle)}
                                    </h1>

                                    <p className="text-justify font-roboto leading-7 px-4 md:px-7">
                                          {t(`about.${aboutKey}.hook`, about.hook)}
                                    </p>
                              </div>
                        </div>

                        <div className="row px-4 lg:px-10 mt-4">
                              <div className="col-12 col-lg-10">
                                    <h1 className="font-poppins font-black text-2xl md:text-4xl  mb-4">
                                          {t(`about.${aboutKey}.title`, about.title)}
                                    </h1>
                                    <p className="text-justify font-roboto leading-7">
                                          {t(`about.${aboutKey}.content`, about.content)}
                                    </p>
                              </div>

                              <div className="col-12 col-lg-2 d-flex justify-content-center align-items-start mt-4 mt-lg-0">
                                    <motion.div
                                          animate={{
                                                x: [0, 30, 0, -30, 0],
                                                y: [0, 15, 30, 15, 0],
                                                rotate: [0, 90, 180, 270, 360],
                                          }}
                                          transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: 'easeInOut',
                                          }}
                                          className="w-20 h-20 rounded-full bg-gold shadow-lg"
                                    />

                                    <motion.div
                                          animate={{
                                                x: [0, 30, 0, -30, 0],
                                                y: [0, 15, 30, 15, 0],
                                                rotate: [0, 90, 180, 270, 360],
                                          }}
                                          transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: 'easeInOut',
                                          }}
                                          className="w-20 h-20 rounded-full bg-gold shadow-lg"
                                    />
                              </div>
                        </div>
                  </section>
            </section>
      );
};

export default About;
