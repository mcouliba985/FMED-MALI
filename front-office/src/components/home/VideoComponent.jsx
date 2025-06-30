import line from '../../assets/icons/line.png';
import SIMG3 from '../../assets/icons/s-img (3).png';
import don from '../../assets/icons/dons.png';
import don2 from '../../assets/icons/don2.png';
import check from '../../assets/icons/check.png';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const VideoComponent = () => {
      const [youtube, setYoutube] = useState({});
      const { t } = useTranslation();

      useEffect(() => {
            async function youtubeFunc() {
                  try {
                        const res = await fetch(`${API_ENDPOINTS.getYoutubeElement}`);
                        const data = await res.json();
                        const item = data[0];
                        setYoutube(item);
                  } catch (error) {
                        console.log(error);
                  }
            }

            youtubeFunc();
      }, []);

      if (youtube === undefined) return null;

      return (
            <section className="container">
                  <div className="row">
                        <div className="col-12 col-lg-5">
                              <div>
                                    <img src={line} alt="line" className="mb-4" />
                              </div>
                              <div className="relative w-full h-64 md:h-[32rem] lg:h-[660px]">
                                    {/* Image */}
                                    <img
                                          src={youtube.imagePath}
                                          className="w-full h-full rounded-2xl object-cover"
                                          alt={youtube.imageName}
                                    />

                                    {/* Overlay sombre */}
                                    <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

                                    {/* Bouton Play */}
                                    <a
                                          href={youtube.youtubeLink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg"
                                    >
                                          <i className="fas fa-play"></i>
                                    </a>
                              </div>
                        </div>
                        <div className="col-12 col-lg-7 px-4">
                              <div>
                                    <h2 className="font-poppins font-bold text-2xl md:text-4xl leading-[normal] mb-4 w-full pt-10 ">
                                          {youtube.hook}
                                    </h2>
                                    <p className="font-roboto text-base">{youtube.content}</p>

                                    <div className="flex flex-col md:flex-row mt-3 gap-4">
                                          <div className="flex flex-row gap-2">
                                                <div>
                                                      <img
                                                            className="w-24"
                                                            src={SIMG3}
                                                            alt="s1112"
                                                      />
                                                </div>

                                                <div className="font-roboto ">
                                                      <h3 className="font-bold">
                                                            {t('startHelping')}
                                                      </h3>
                                                      <p>{t('awareness')}</p>
                                                </div>
                                          </div>

                                          <div className="flex flex-row gap-2">
                                                <div>
                                                      <img
                                                            className="w-[50px] md:w-[96px]"
                                                            src={don}
                                                            alt="faire un don"
                                                      />
                                                </div>

                                                <div className="font-roboto ">
                                                      <h3 className="font-bold">{t('donate')}</h3>
                                                      <p>{t('helpOthers')}</p>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="mt-4 flex gap-4">
                                    <div>
                                          <img
                                                className="w-[128px] md:w-24"
                                                src={don2}
                                                alt="sdonss2"
                                          />
                                    </div>

                                    <div className="font-roboto ">
                                          <h3 className="font-bold border-b-2 border-black text-2xl">
                                                {t('reasonsToDonate')}{' '}
                                                <span className="text-gold">{t('don')}</span>{' '}
                                                {t('fmed')}
                                          </h3>

                                          <ul className="flex flex-col mt-4 gap-6">
                                                {/* Item 1 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />
                                                      <span className="text-base md:text-lg font-medium">
                                                            {t('aboutFMED')}
                                                      </span>
                                                </li>

                                                {/* Item 2 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />
                                                      <span className="text-base md:text-lg font-medium">
                                                            {t('supportInclusion')}
                                                      </span>
                                                </li>

                                                {/* Item 3 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />

                                                      <span className="text-base md:text-lg font-medium">
                                                            {t('maliSolidarity')}
                                                      </span>
                                                </li>

                                                {/* Ajoute d'autres items si besoin */}
                                          </ul>
                                    </div>
                              </div>

                              <div className="flex flex-col md:flex-row mt-4 gap-4">
                                    <button className="bg-gold text-gray-600 hover:bg-gray-600 hover:text-gold transition-all px-4 py-2 rounded-lg">
                                          {t('aboutUs')}
                                    </button>

                                    <button className="bg-transparent text-gray-600 hover:bg-gray-600 hover:text-gold transition-all px-4 py-2 rounded-lg">
                                          <i className="fas fa-phone me-2 text-2xl"></i>
                                          <span className="mt-2">+223 76 30 45 84</span>
                                    </button>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default VideoComponent;
