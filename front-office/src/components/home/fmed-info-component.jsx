import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import cause from '../../assets/res/cause-bg.png';
import spade from '../../assets/icons/spade-base.png';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const FmedInfo = () => {
      const [articleData, setArticleData] = useState([]);

      useEffect(() => {
            async function artilces() {
                  try {
                        const fetchArticle = await fetch(API_ENDPOINTS.getPublishedArticles);
                        const responseData = await fetchArticle.json();
                        setArticleData(responseData);
                  } catch (error) {
                        console.log(error);
                  }
            }

            artilces();
      }, []);

      if (articleData === undefined) return null;
      return (
            <ArticleWrapper className="py-4">
                  <div className="container relative">
                        <div className="flex flex-row justify-between">
                              <div>
                                    <TitleArticle>
                                          <i class="fas fa-circle-info me-2"></i>
                                          FMED INFO
                                    </TitleArticle>
                                    <h3 className="font-nunito text-2xl my-2 font-bold">
                                          Suivez nos actualités en temps réel
                                    </h3>
                              </div>

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
                                                                  {data.content.length > 180
                                                                        ? `${data.content.slice(0, data.content.indexOf(' ', 180))}...`
                                                                        : data.content}
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
