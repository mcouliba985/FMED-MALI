import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import cause from '../../assets/res/cause-bg.png';
import spade from '../../assets/icons/spade-base.png';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FmedInfo = () => {
      const [articleData, setArticleData] = useState([]);
      const { t, i18n } = useTranslation();

      useEffect(() => {
            async function fetchArticles() {
                  try {
                        const res = await fetch(API_ENDPOINTS.getPublishedArticles);
                        if (!res.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des articles :',
                                    res.status
                              );
                              return;
                        }
                        const data = await res.json();
                        if (Array.isArray(data)) {
                              setArticleData(data);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', data);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            fetchArticles();
      }, []);

      if (!articleData || articleData.length === 0) return null;

      return (
            <ArticleWrapper className="py-4">
                  <div className="container relative">
                        <div className="flex flex-row justify-between">
                              <div>
                                    <TitleArticle>
                                          <i className="fas fa-circle-info me-2"></i>
                                          {t('fmedInfo')}
                                    </TitleArticle>
                                    <h3 className="font-nunito text-2xl my-2 font-bold">
                                          {t('realTimeNews')}
                                    </h3>
                              </div>

                              <SpadeDecorator>
                                    <motion.img
                                          className="w-full h-full"
                                          src={spade}
                                          alt="spade"
                                          animate={{ opacity: [1, 0, 1] }}
                                          transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                          }}
                                    />
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
                                    delay: 10000,
                                    disableOnInteraction: false,
                              }}
                              breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1050: { slidesPerView: 3 },
                              }}
                              loop={true}
                              className="relative px-4"
                        >
                              {articleData.map((data) => {
                                    const hookText =
                                          data.hook?.[i18n.language] || data.hook?.en || '';
                                    const titleText =
                                          data.title?.[i18n.language] || data.title?.en || '';

                                    const shortHook =
                                          hookText.length > 180
                                                ? `${hookText.slice(0, hookText.indexOf(' ', 180))}...`
                                                : hookText;

                                    return (
                                          <SwiperSlide key={data.id}>
                                                <ArticleSwiper className="lg:w-[285px] xl:w-[350px]">
                                                      <div className="py-4">
                                                            <img
                                                                  className="w-full h-[230px] object-cover rounded-2xl"
                                                                  src={data.imagePath}
                                                                  alt={data.imageName}
                                                            />

                                                            <a
                                                                  href={`/article/${data.id}`}
                                                                  className="font-roboto text-lg py-2 font-light p-2 hover:text-red-600 block"
                                                            >
                                                                  <strong>{titleText}</strong>
                                                                  <br />
                                                                  {shortHook}
                                                            </a>
                                                      </div>
                                                </ArticleSwiper>
                                          </SwiperSlide>
                                    );
                              })}
                        </Swiper>
                  </div>
            </ArticleWrapper>
      );
};

export default FmedInfo;

const TitleArticle = styled.h2`
      text-transform: uppercase;
      font-size: 32px;
      font-weight: 800;
      font-family: 'Nunito Sans';
`;

const ArticleWrapper = styled.section`
      background: url(${cause}) repeat;
`;

const ArticleSwiper = styled.article`
      height: auto;
`;

const SpadeDecorator = styled.div`
      position: relative;
      width: 96px;
      height: 96px;
`;
